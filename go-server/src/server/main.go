package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]struct{})

func main() {
	http.Handle("/", http.FileServer(http.Dir("/Users/aaronmichaels/Developer/Pennlabs/OHQ/ApiServer")))
	// TODO: dynamically set this port
	if err := http.ListenAndServe(":3090", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
