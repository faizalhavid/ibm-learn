package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("APP_PORT")
	fmt.Println("Starting server on port:", port)
	http.HandleFunc("/", tesServer)
	http.ListenAndServe(":"+port, nil)
}

func tesServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, %s", r.URL.Path[1:])

	dataString := "Hello " + r.URL.Path[1:]
	dataByte := []byte(dataString)

	destination := os.Getenv("APP_DATA")
	file := destination + "/" + r.URL.Path[1:] + ".txt"
	if err := os.WriteFile(file, dataByte, 0644); err != nil {
		panic(err)
	}
	fmt.Println("Done writing to file:", file)
}
