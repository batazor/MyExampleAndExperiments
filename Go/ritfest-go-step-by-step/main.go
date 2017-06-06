package main

import (
	"github.com/takama/router"
	"os"
	"github.com/joho/godotenv"
	"log"
)

// Run server: go build && step-by-step
// Try requests: curl http://127.0.0.1:8000/test
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("HTTP_PORT")
	if len(port) == 0 {
		log.Fatal("Required parameter service port is not set")
	}

	r := router.New()
	r.GET("/", home)

	r.Listen(":" + port)
}