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

// ConverMarkdownToHTML ...
func ConverMarkdownToHTML(markdown string) string {
	return string(blackfriday.MarkdownBasic([]byte(markdown)))
}
