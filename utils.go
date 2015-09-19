package main

import (
	"crypto/rand"
	"fmt"
)

// GenerateID ...
func GenerateID() string {
	b := make([]byte, 16)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
