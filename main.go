package main

import (
	"html/template"

	"go-blog-example/routes"
	"go-blog-example/session"

	"github.com/codegangsta/martini"
	"github.com/martini-contrib/render"
	"labix.org/v2/mgo"
)

func unescape(x string) interface{} {
	return template.HTML(x)
}

func main() {
	mongoSession, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}

	db := mongoSession.DB("blog")

	m := martini.Classic()

	unescapeFuncMap := template.FuncMap{"unescape": unescape}

	m.Map(db)

	m.Use(session.Middleware)

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

	m.Get("/", routes.IndexHandler)
	m.Get("/login", routes.GetLoginHandler)
	m.Post("/login", routes.PostLoginHandler)
	m.Get("/write", routes.WriteHandler)
	m.Get("/edit/:id", routes.EditHandler)
	m.Get("/delete/:id", routes.DeleteHandler)
	m.Post("/SavePost", routes.SavePostHandler)
	m.Post("/gethtml", routes.GetHTMLHandler)

	m.Run()
}
