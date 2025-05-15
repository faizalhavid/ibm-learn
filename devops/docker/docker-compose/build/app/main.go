package main

import (
	"fmt"
	"net/http"
	"os"
)

var counter = 0

func main() {
	port := os.Getenv("APP_PORT")
	fmt.Println("Starting server on port:", port)
	http.HandleFunc("/", tesServer)
	http.HandleFunc("/health", healthCheck)
	http.ListenAndServe(":"+port, nil)
}

func tesServer(w http.ResponseWriter, r *http.Request) {
	mode := os.Getenv("APP_MODE")
	fmt.Fprintln(w, "Hello" + mode + " %s", r.URL.Path[1:])

	dataString := "Hello " + r.URL.Path[1:]
	dataByte := []byte(dataString)

	destination := os.Getenv("APP_DATA")
	file := destination + "/" + r.URL.Path[1:] + ".txt"
	if err := os.WriteFile(file, dataByte, 0644); err != nil {
		panic(err)
	}
	fmt.Println("Done writing to file:", file)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	counter += 1
	if counter > 5 {
		w.WriteHeader(http.StatusTooManyRequests)
		http.Error(w, "Too many requests", http.StatusTooManyRequests)
		return
	}
	fmt.Fprintln(w, "OK")
	fmt.Println("Health check called")
}
