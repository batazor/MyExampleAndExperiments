package routes

import (
	"fmt"
	"go-blog-example/db/documents"
	"go-blog-example/models"
	"go-blog-example/session"

	"labix.org/v2/mgo"

	"github.com/martini-contrib/render"
)

// IndexHandler ...
func IndexHandler(rnd render.Render, s *session.Session, db *mgo.Database) {
	fmt.Println(s.Username)

	postDocuments := []documents.PostDocument{}
	postsCollection := db.C("posts")
	postsCollection.Find(nil).All(&postDocuments)

	posts := []models.Post{}
	for _, doc := range postDocuments {
		post := models.Post{doc.ID, doc.Title, doc.ContentHTML, doc.ContentMarkdown}
		posts = append(posts, post)
	}

	model := models.PostListModel{}
	model.IsAuthorized = s.IsAuthorized
	model.Posts = posts

	rnd.HTML(200, "index", model)
}
