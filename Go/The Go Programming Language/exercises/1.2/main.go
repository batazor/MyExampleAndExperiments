package main

import (
  "os"
  "fmt"
  "strconv"
)

func main() {
  for index, arg := range os.Args[1:] {
    s := strconv.Itoa(index)
    fmt.Println(s + ": " + arg)
  }
}
