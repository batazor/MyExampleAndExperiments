package models

// Post ...
type Post struct {
	ID              string
	Title           string
	ContentHTML     string
	ContentMarkdown string
}

// NewPost - constructor.
func NewPost(id, title, ContentHTML, ContentMarkdown string) *Post {
	return &Post{id, title, ContentHTML, ContentMarkdown}
}
