package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	fmt.Println(r)
	var env string
	if env = os.Getenv("port"); env == "" {
		env = "3090"
	}
	http.Handle("/", http.FileServer(http.Dir("/Users/aaronmichaels/Developer/Pennlabs/OHQ/ApiServer")))
	if err := http.ListenAndServe(":"+env, nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
