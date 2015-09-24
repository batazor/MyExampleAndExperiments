package routes

import (
	"fmt"
	"go-blog-example/session"
	"net/http"

	"github.com/martini-contrib/render"
)

// GetLoginHandler ...
func GetLoginHandler(rnd render.Render) {
	rnd.HTML(200, "login", nil)
}

// PostLoginHandler ...
func PostLoginHandler(rnd render.Render, r *http.Request, s *session.Session) {
	username := r.FormValue("username")
	password := r.FormValue("password")

	fmt.Println(username)
	fmt.Println(password)

	s.Username = username

	rnd.Redirect("/")
}
