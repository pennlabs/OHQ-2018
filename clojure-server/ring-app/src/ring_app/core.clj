(ns ring-app.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.util.response :refer [response]]
            [ring.middleware.file :as file]
            [org.httpkit.server :refer [run-server]]
            [compojure.core :refer [defroutes GET context ANY]]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [environ.core :as environ]))

(defn handler [request-map]
  (response
    (str "<html><body> all data: "
         (:remote-addr request-map)
         "</body></html>")))

(defn handler2 [request-map]
  (response
    (str "<html><body> all dabbbaa: "
         (:remote-addr request-map)
         "</body></html>")))

(defn file-handler [request-map]

  )

(defroutes routes
           (GET "/" [] handler)
           (GET "/ws" [] handler2)
           (GET "/:id" [] handler)
           (route/files "static")
           )

(defn -main []
  (run-server
    ; due to implementation details we pass a var here
    ; to allow our handler to be dynamically redefined
    #'routes
    {:port (or (Integer/parseInt (environ/env :port)) 3000)}))
