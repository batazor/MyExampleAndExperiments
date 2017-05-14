package main

import (
	"net/http"
	"io/ioutil"
	"fmt"
)

func main() {
	resp, _ := http.Get("http://example.com/")
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))
	resp.Body.Close()
}