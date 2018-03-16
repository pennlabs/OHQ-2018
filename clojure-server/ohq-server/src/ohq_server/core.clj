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
            [environ.core :as environ]))

(defn handler [request-map]
  (response
    (str "<html><body> all data1: "
         (:remote-addr request-map)
         "</body></html>")))

(defn handler2 [request-map]
  (response
    (str "<html><body> all data2: "
         (:remote-addr request-map)
         "</body></html>")))

(defn file-handler [request-map]

  )

(defroutes routes
           (GET "/" [] handler)
           (GET "/ws"  request (ohq-server.websockets/ws-handler request))
           (GET "/:id" [] handler)
           (route/files "static")
           )

(defn -main []
  (run-server
    ; due to implementation details we pass a var here
    ; to allow our handler to be dynamically redefined
    #'routes
    {:port (or (Integer/parseInt (environ/env :port)) 3000)}))
