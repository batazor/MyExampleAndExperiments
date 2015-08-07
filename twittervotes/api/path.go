package main

import (
	"strings"
)

// PathSeparator ...
const PathSeparator = "/"

// Path ...
type Path struct {
	Path string
	ID   string
}

// NewPath ...
func NewPath(p string) *Path {
	var id string
	p = strings.Trim(p, PathSeparator)
	s := strings.Split(p, PathSeparator)
	if len(s) > 1 {
		id = s[len(s)-1]
		p = strings.Join(s[:len(s)-1], PathSeparator)
	}

	return &Path{Path: p, ID: id}
}

// HasID ...
func (p *Path) HasID() bool {
	return len(p.ID) > 0
}
