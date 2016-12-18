package main

import (
  "fmt"
  "os"
  "time"
  "strings"
)

func main() {
  var s, sep string

  // Type one
  startOne := time.Now()
	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = " "
	}
	fmt.Println(s)
  secsOne := time.Since(startOne).Seconds()

  // Type two
  s, sep = "", ""
  startTwo := time.Now()
  for _, arg := range os.Args[1:] {
    s += sep + arg
    sep = " "
  }
  fmt.Println(s)
  secsTwo := time.Since(startTwo).Seconds()

  // Type three
  startThree := time.Now()
  fmt.Println(strings.Join(os.Args[1:], " "))
  secsThree := time.Since(startThree).Seconds()

  // Echo time three methods
  fmt.Println(secsOne, "type one")
  fmt.Println(secsTwo, "type two")
  fmt.Println(secsThree, "type three")
}
