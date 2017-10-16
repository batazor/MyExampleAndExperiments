package models

// Post ...
type Post struct {
	ID              string
	Title           string
	ContentHTML     string
	ContentMarkdown string
}

// NewPost - constructor.
func NewPost(ID, title, ContentHTML, ContentMarkdown string) *Post {
	return &Post{ID, title, ContentHTML, ContentMarkdown}
}
