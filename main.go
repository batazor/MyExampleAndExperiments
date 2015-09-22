package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"

	"go-blog-example/db/documents"
	"go-blog-example/models"
	"go-blog-example/session"
	"go-blog-example/utils"

	"github.com/codegangsta/martini"
	"github.com/martini-contrib/render"
	"labix.org/v2/mgo"
)

// CookieName ...
const (
	CookieName = "sessionID"
)

var postsCollection *mgo.Collection
var inMemorySession *session.Session

func getLoginHandler(rnd render.Render) {
	rnd.HTML(200, "login", nil)
}

func postLoginHandler(rnd render.Render, r *http.Request, w http.ResponseWriter) {
	username := r.FormValue("username")
	password := r.FormValue("password")

	fmt.Println(username)
	fmt.Println(password)

	sessionID := inMemorySession.Init(username)

	cookie := &http.Cookie{
		Name:    CookieName,
		Value:   sessionID,
		Expires: time.Now().Add(5 * time.Minute),
	}

	http.SetCookie(w, cookie)

	rnd.Redirect("/")
}

func indexHandler(rnd render.Render, r *http.Request) {
	cookie, _ := r.Cookie(CookieName)
	if cookie != nil {
		fmt.Println(inMemorySession.Get(cookie.Value))
	}

	postDocuments := []documents.PostDocument{}
	postsCollection.Find(nil).All(&postDocuments)

	posts := []models.Post{}
	for _, doc := range postDocuments {
		post := models.Post{doc.ID, doc.Title, doc.ContentHTML, doc.ContentMarkdown}
		posts = append(posts, post)
	}

	rnd.HTML(200, "index", posts)
}

func writeHandler(rnd render.Render) {
	post := models.Post{}
	rnd.HTML(200, "write", post)
}

func editHandler(rnd render.Render, r *http.Request, params martini.Params) {
	id := params["id"]

	postDocument := documents.PostDocument{}
	err := postsCollection.FindId(id).One(&postDocument)
	if err != nil {
		rnd.Redirect("/")
		return
	}
	post := models.Post{postDocument.ID, postDocument.Title, postDocument.ContentHTML, postDocument.ContentMarkdown}

	rnd.HTML(200, "write", post)
}

func savePostHandler(rnd render.Render, r *http.Request) {
	id := r.FormValue("id")
	title := r.FormValue("title")
	contentMarkdown := r.FormValue("content")
	ContentHTML := utils.ConverMarkdownToHTML(contentMarkdown)

	postDocument := documents.PostDocument{id, title, ContentHTML, contentMarkdown}
	if id != "" {
		postsCollection.UpdateId(id, postDocument)
	} else {
		id = utils.GenerateID()
		postDocument.ID = id
		postsCollection.Insert(postDocument)
	}

	rnd.Redirect("/")
}

func deleteHandler(rnd render.Render, r *http.Request, params martini.Params) {
	id := params["id"]
	if id == "" {
		rnd.Redirect("/")
		return
	}

	postsCollection.RemoveId(id)

	rnd.Redirect("/")
}

// getHtmlHandler ...
func getHTMLHandler(rnd render.Render, r *http.Request) {
	md := r.FormValue("md")
	html := utils.ConverMarkdownToHTML(md)

	rnd.JSON(200, map[string]interface{}{"html": html})
}

func unescape(x string) interface{} {
	return template.HTML(x)
}

func main() {
	inMemorySession = session.NewSession()

	session, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}

	postsCollection = session.DB("blog").C("posts")

	m := martini.Classic()

	unescapeFuncMap := template.FuncMap{"unescape": unescape}

	m.Use(render.Renderer(render.Options{
		Directory:  "templates",
		Layout:     "layout",
		Extensions: []string{".html"},
		Funcs:      []template.FuncMap{unescapeFuncMap},
		Charset:    "UTF-8",
		IndentJSON: true,
	}))

	staticOptions := martini.StaticOptions{Prefix: "assets"}
	m.Use(martini.Static("assets", staticOptions))

	m.Get("/", indexHandler)
	m.Get("/login", getLoginHandler)
	m.Post("/login", postLoginHandler)
	m.Get("/write", writeHandler)
	m.Get("/edit/:id", editHandler)
	m.Get("/delete/:id", deleteHandler)
	m.Post("/SavePost", savePostHandler)
	m.Post("/gethtml", getHTMLHandler)

	m.Run()
}
