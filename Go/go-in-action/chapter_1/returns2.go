package main

import "fmt"

func Names2() (first string, second string) {
	first = "Foo"
	second = "Bar"
	return
}

func main() {
	n1, n2 := Names2()
	fmt.Println(n1, n2)
}