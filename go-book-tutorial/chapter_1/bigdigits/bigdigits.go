package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

var bigDigits = [][]string{
	{"  000  ", " 0   0 ", " 0   0 ", " 0   0 ", "  000  "},
	{"    1  ", "   11  ", "  1 1  ", "    1  ", "   111 "},
	{"  222 ", " 2  2 ", "   2  ", "  2   ", " 2222 "},
	{"  333  ", " 3   3 ", "    3  ", " 3   3 ", "  333  "},
	{" 4   4 ", " 4   4 ", "  4444 ", "     4 ", "     4 "},
	{" 55555 ", " 5     ", " 55555 ", "     5 ", " 55555 "},
	{"  6666 ", " 6     ", " 66666 ", " 6   6 ", "  666  "},
	{" 77777 ", "    7  ", "   777 ", "    7  ", "    7  "},
	{" 88888 ", " 8   8 ", " 88888 ", " 8   8 ", " 88888 "},
	{" 99999 ", " 9   9 ", " 99999 ", "     9 ", " 99999 "},
}

func main() {
	if len(os.Args) == 1 {
		fmt.Printf("usage: %s <whole-number>\n", filepath.Base(os.Args[0]))
		os.Exit(1)
	}

	stringOfDigits := os.Args[1]
	for row := range bigDigits[0] {
		line := ""
		for column := range stringOfDigits {
			digit := stringOfDigits[column] - '0'
			if 0 <= digit && digit <= 9 {
				line += bigDigits[digit][row] + " "
			} else {
				log.Fatal("invalid whole number")
			}
		}

		fmt.Println(line)
	}
}
