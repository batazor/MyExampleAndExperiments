package main

import (
	"html/template"
	"net/http"

	"go-blog-example/models"

	"github.com/codegangsta/martini"
	"github.com/martini-contrib/render"
	"github.com/russross/blackfriday"
)

var posts map[string]*models.Post

func indexHandler(rnd render.Render) {
	rnd.HTML(200, "index", posts)
}

func writeHandler(rnd render.Render) {
	rnd.HTML(200, "write", nil)
}

func editHandler(rnd render.Render, r *http.Request, params martini.Params) {
	id := params["id"]
	post, found := posts[id]
	if !found {
		rnd.Redirect("/")
		return
	}

	rnd.HTML(200, "write", post)
}

func savePostHandler(rnd render.Render, r *http.Request) {
	id := r.FormValue("id")
	title := r.FormValue("title")
	contentMarkdown := r.FormValue("content")
	contentHTML := string(blackfriday.MarkdownBasic([]byte(contentMarkdown)))

	var post *models.Post
	if id != "" {
		post = posts[id]
		post.Title = title
		post.ContentHTML = contentHTML
		post.ContentMarkdown = contentMarkdown
	} else {
		id = GenerateID()
		post := models.NewPost(id, title, contentHTML, contentMarkdown)
		posts[post.ID] = post
	}

	rnd.Redirect("/")
}

func deleteHandler(rnd render.Render, r *http.Request, params martini.Params) {
	id := params["id"]
	if id == "" {
		rnd.Redirect("/")
		return
	}

	delete(posts, id)

	rnd.Redirect("/")
}

// getHtmlHandler ...
func getHTMLHandler(rnd render.Render, r *http.Request) {
	md := r.FormValue("md")
	htmlBytes := blackfriday.MarkdownBasic([]byte(md))

	rnd.JSON(200, map[string]interface{}{"html": string(htmlBytes)})
}

func unescape(x string) interface{} {
	return template.HTML(x)
}

func main() {
	posts = make(map[string]*models.Post, 0)

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
	m.Get("/write", writeHandler)
	m.Get("/edit/:id", editHandler)
	m.Get("/delete/:id", deleteHandler)
	m.Post("/SavePost", savePostHandler)
	m.Post("/gethtml", getHTMLHandler)

	m.Run()
}
