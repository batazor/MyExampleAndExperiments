package routes

import (
	"go-blog-example/db/documents"
	"go-blog-example/models"
	"go-blog-example/session"
	"go-blog-example/utils"
	"net/http"

	"labix.org/v2/mgo"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

// WriteHandler ...
func WriteHandler(rnd render.Render, s *session.Session) {
	if !s.IsAuthorized {
		rnd.Redirect("/")
	}
	model := models.EditPostModel{}
	model.IsAuthorized = s.IsAuthorized
	model.Post = models.Post{}
	rnd.HTML(200, "write", model)
}

// EditHandler ...
func EditHandler(s *session.Session, rnd render.Render, r *http.Request, params martini.Params, db *mgo.Database) {
	if !s.IsAuthorized {
		rnd.Redirect("/")
	}
	postsCollection := db.C("posts")

	id := params["id"]

	postDocument := documents.PostDocument{}
	err := postsCollection.FindId(id).One(&postDocument)
	if err != nil {
		rnd.Redirect("/")
		return
	}
	post := models.Post{postDocument.ID, postDocument.Title, postDocument.ContentHTML, postDocument.ContentMarkdown}

	model := models.EditPostModel{}
	model.IsAuthorized = s.IsAuthorized
	model.Post = post
	rnd.HTML(200, "write", model)
}

// ViewHandler ...
func ViewHandler(s *session.Session, rnd render.Render, r *http.Request, params martini.Params, db *mgo.Database) {
	postsCollection := db.C("posts")

	id := params["id"]

	postDocument := documents.PostDocument{}
	err := postsCollection.FindId(id).One(&postDocument)
	if err != nil {
		rnd.Redirect("/")
		return
	}
	post := models.Post{postDocument.ID, postDocument.Title, postDocument.ContentHTML, postDocument.ContentMarkdown}

	model := models.ViewPostModel{}
	model.IsAuthorized = s.IsAuthorized
	model.Post = post
	rnd.HTML(200, "view", model)
}

// SavePostHandler ...
func SavePostHandler(s *session.Session, rnd render.Render, r *http.Request, db *mgo.Database) {
	if !s.IsAuthorized {
		rnd.Redirect("/")
	}
	id := r.FormValue("id")
	title := r.FormValue("title")
	contentMarkdown := r.FormValue("content")
	contentHTML := utils.ConvertMarkdownToHTML(contentMarkdown)

	postDocument := documents.PostDocument{id, title, contentHTML, contentMarkdown}

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

// DeleteHandler ...
func DeleteHandler(rnd render.Render, r *http.Request, params martini.Params, db *mgo.Database, s *session.Session) {
	if !s.IsAuthorized {
		rnd.Redirect("/")
	}

	id := params["id"]
	if id == "" {
		rnd.Redirect("/")
		return
	}

	postsCollection := db.C("posts")
	postsCollection.RemoveId(id)

	rnd.Redirect("/")
}

// GetHTMLHandler ...
func GetHTMLHandler(rnd render.Render, r *http.Request) {
	md := r.FormValue("md")
	html := utils.ConvertMarkdownToHTML(md)

	rnd.JSON(200, map[string]interface{}{"html": html})
}
