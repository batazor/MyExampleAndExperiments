package main

import (
	"gopkg.in/gcfg.v1"
	"fmt"
)

func main() {
	config := struct {
		Section struct {
			Enabled bool
			Path string
		}
	}{}
	err := gcfg.ReadFileInto(&config, "config.ini")
	if err != nil {
		fmt.Println("Failed to parse config file: %s", err)
	}
	fmt.Println(config.Section.Enabled)
	fmt.Println(config.Section.Path)
}