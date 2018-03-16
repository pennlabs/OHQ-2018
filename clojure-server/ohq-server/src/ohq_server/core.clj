(ns ohq-server.core
  (:gen-class)
  (:require [ohq-server.websockets]
            [ring.adapter.jetty :as jetty]
            [ring.util.response :refer [response]]
            [ring.middleware.file :as file]
            [org.httpkit.server :refer :all]
            [compojure.core :refer [defroutes GET context ANY]]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [environ.core :as environ]
            [ring.util.response :as response]))

(defn handler [request-map]
  (response/resource-response "index.html" {:root "public"}))

(defn file-handler [request-map]

  )

(defroutes routes
           (GET "/" [] handler)
           (GET "/ws"  request (ohq-server.websockets/ws-handler2 request))
           (GET "/:id" [])
           (route/resources "/"))

(defn -main []
  (run-server
    ; due to implementation details we pass a var here
    ; to allow our handler to be dynamically redefined
    #'routes
    {:port (or (Integer/parseInt (environ/env :port)) 3000)
     :threads 8}))
