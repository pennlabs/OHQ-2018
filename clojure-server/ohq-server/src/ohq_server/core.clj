(ns ohq-server.core
  (:gen-class)
  (:require [ohq-server.websockets :refer [ws-handler]]
            [ring.adapter.jetty :as jetty]
            [ring.util.response :refer [response]]
            [ring.middleware.file :as file]
            [org.httpkit.server :refer :all]
            [compojure.core :refer [defroutes GET context ANY]]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [environ.core :as environ]
            [ring.util.response :as response]))

(defn serve-static [request-map]
  (response/resource-response "index.html" {:root "public"}))

(defroutes routes
           (GET "/" [] serve-static)
           (GET "/ws" request (ws-handler request))
           (GET "/:id" [] serve-static)
           (route/resources "/"))

(defn -main []
  (run-server
    ; due to implementation details we pass a var here
    ; to allow our handler to be dynamically redefined
    #'routes
    {:port    (Integer/parseInt (or (environ/env :port) "3000"))
     :threads 8}))

(defn mark [] (println (json/write-str {:foo {"bar" 123}})))

(defn mark1 []
  (println
    (json/read-str

      "{\n  \"extends\": [\"eslint:recommended\", \"standard\"],\n  \"parser\": \"babel-eslint\",\n  \"plugins\": [\n    \"react\"\n  ],}"
      )
    )

  )
