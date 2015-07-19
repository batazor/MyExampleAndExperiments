package main

import (
	"net/http"
	"path"
	"text/template"
)

// Book -> struct save book
type Book struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}

func main() {
	http.HandleFunc("/", ShowBooks)
	http.ListenAndServe(":8080", nil)
}

// ShowBooks -> JSON
func ShowBooks(w http.ResponseWriter, r *http.Request) {
	book := Book{"Building Web Apps Go", "Jeremy Saenz"}

	fp := path.Join("template", "index.html")
	tmpl, err := template.ParseFiles(fp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, book); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
