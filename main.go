package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
	"github.com/russross/blackfriday"
)

func main() {
	router := httprouter.New()
	router.GET("/", HomeHandler)

	// Posts collection
	router.GET("/posts", PostsIndexHandler)
	router.POST("/posts", PostsCreateHandler)

	// Posts singular
	router.GET("/posts/:id", PostShowHandler)
	router.PUT("/posts/:id", PostUpdateHandler)
	router.GET("/posts/:id/edit", PostEditHandler)

	// Markdown
	router.GET("/markdown", GenerateMarkdown)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("starting server on :8080")
	http.ListenAndServe(":"+port, router)
}

// HomeHandler -> Home page
func HomeHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "Home")
}

// PostsIndexHandler -> Posts index
func PostsIndexHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "posts index")
}

// PostsCreateHandler -> create post
func PostsCreateHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "posts create")
}

// PostShowHandler -> Show post
func PostShowHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	id := p.ByName("id")
	fmt.Fprintln(rw, "showing post", id)
}

// PostUpdateHandler -> update posts
func PostUpdateHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "post update")
}

// PostDeleteHandler -> delete posts
func PostDeleteHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "post delete")
}

// PostEditHandler -> edit posts
func PostEditHandler(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	fmt.Fprintln(rw, "post edit")
}

// GenerateMarkdown generate markdown.
func GenerateMarkdown(rw http.ResponseWriter, router *http.Request, p httprouter.Params) {
	markdown := blackfriday.MarkdownCommon([]byte(router.FormValue("body")))
	rw.Write(markdown)
}
