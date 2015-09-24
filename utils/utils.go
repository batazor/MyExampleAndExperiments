package utils

import (
	"crypto/rand"
	"fmt"

	"github.com/russross/blackfriday"
)

// GenerateID ...
func GenerateID() string {
	b := make([]byte, 16)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

// ConvertMarkdownToHTML ...
func ConvertMarkdownToHTML(markdown string) string {
	return string(blackfriday.MarkdownBasic([]byte(markdown)))
}
