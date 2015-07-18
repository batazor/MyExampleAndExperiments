package main

import (
	"encoding/json"
	"net/http"
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

	js, err := json.Marshal(book)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
