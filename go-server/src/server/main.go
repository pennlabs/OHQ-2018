package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	fmt.Println(r)
	http.Handle("/", http.FileServer(http.Dir("/Users/aaronmichaels/Developer/Pennlabs/OHQ/ApiServer")))
	// TODO: dynamically set this port
	if err := http.ListenAndServe(":3090", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
