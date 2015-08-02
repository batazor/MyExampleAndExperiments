package thesaurus

// Thesaurus ...
type Thesaurus interface {
	Synonyms(term string) ([]string, error)
}
