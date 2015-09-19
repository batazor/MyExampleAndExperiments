package models

// Post ...
type Post struct {
	ID      string
	Title   string
	Content string
}

// NewPost - constructor.
func NewPost(id, title, content string) *Post {
	return &Post{id, title, content}
}
