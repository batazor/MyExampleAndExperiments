package routes

import (
	"go-blog-example/db/documents"
	"go-blog-example/models"
	"go-blog-example/utils"
	"net/http"

	"labix.org/v2/mgo"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func WriteHandler(rnd render.Render) {
	post := models.Post{}
	rnd.HTML(200, "write", post)
}

func EditHandler(rnd render.Render, r *http.Request, params martini.Params, db *mgo.Database) {
	postsCollection := db.C("posts")

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

func SavePostHandler(rnd render.Render, r *http.Request, db *mgo.Database) {
	id := r.FormValue("id")
	title := r.FormValue("title")
	contentMarkdown := r.FormValue("content")
	ContentHTML := utils.ConvertMarkdownToHTML(contentMarkdown)

	postDocument := documents.PostDocument{id, title, ContentHTML, contentMarkdown}

	postsCollection := db.C("posts")
	if id != "" {
		postsCollection.UpdateId(id, postDocument)
	} else {
		id = utils.GenerateID()
		postDocument.ID = id
		postsCollection.Insert(postDocument)
	}

	rnd.Redirect("/")
}

func DeleteHandler(rnd render.Render, r *http.Request, params martini.Params, db *mgo.Database) {
	id := params["id"]
	if id == "" {
		rnd.Redirect("/")
		return
	}

	postsCollection := db.C("posts")
	postsCollection.RemoveId(id)

	rnd.Redirect("/")
}

func GetHTMLHandler(rnd render.Render, r *http.Request) {
	md := r.FormValue("md")
	html := utils.ConvertMarkdownToHTML(md)

	rnd.JSON(200, map[string]interface{}{"html": html})
}
