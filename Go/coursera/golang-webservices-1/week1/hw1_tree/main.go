package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strings"
)

func filterIsDir(list []os.FileInfo) []os.FileInfo {
	var arr []os.FileInfo

	for file := range list {
		isDir := list[file].IsDir()
		if isDir {
			arr = append(arr, list[file])
		}
	}

	return arr
}

var prevPath string

func pathToTree(path string) string {
	count := strings.Count(path, "/")
	prevCount := strings.Count(prevPath, "/")

	// fmt.Println("prevPath", prevPath, prevCount)
	// fmt.Println("path", path, count)

	nameArr := strings.Split(path, "/")
	name := nameArr[len(nameArr)-1]

	var str []string
	for index := 0; index < count; index += 1 {
		if count > prevCount {
			str = append(str, "└───")
		} else if prevCount == count {
			str = append(str, "├───")
		} else {
			str = append(str, "│   ")
		}
	}

	t := strings.Join(str, "")

	prevPath = path

	return strings.Join([]string{t, name}, "")
}

func dirTree(out io.Writer, path string, printFiles bool) error {
	file, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("Error: %v", err)
	}

	fileInfo, err := file.Stat()
	isDirFile := fileInfo.IsDir()

	if isDirFile {
		listFile, err := file.Readdir(-1)
		if err != nil {
			return fmt.Errorf("Error: %v", err)
		}
		sort.Slice(listFile, func(i, j int) bool {
			return listFile[i].Name() < listFile[j].Name()
		})

		if path != "." {
			fmt.Fprintln(out, pathToTree(path))
		}

		if !printFiles {
			listFile = filterIsDir(listFile)
		}

		for index := 0; index < len(listFile); index += 1 {
			isDir := listFile[index].IsDir()

			if isDir {
				name := listFile[index].Name()
				s := []string{path, name}
				newPath := strings.Join(s, "/")
				dirTree(out, newPath, printFiles)
			}
		}
	}

	return nil
}

func main() {
	out := os.Stdout
	if !(len(os.Args) == 2 || len(os.Args) == 3) {
		panic("usage go run main.go . [-f]")
	}
	path := os.Args[1]
	printFiles := len(os.Args) == 3 && os.Args[2] == "-f"
	err := dirTree(out, path, printFiles)
	if err != nil {
		panic(err.Error())
	}
}
