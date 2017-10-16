package documents

// PostDocument ...
type PostDocument struct {
	ID              string `bson:"_id,omitempty"`
	Title           string
	ContentHTML     string
	ContentMarkdown string
}
