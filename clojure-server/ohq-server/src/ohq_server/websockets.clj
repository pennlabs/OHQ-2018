(ns ohq-server.websockets
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.util.response :refer [response]]
            [ring.middleware.file :as file]
            [org.httpkit.server :refer :all]
            [compojure.core :refer [defroutes GET context ANY]]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [environ.core :as environ]))

(defonce class-ids-to-class-data (ref {}))
(defonce student-links-to-class-ids (ref {}))
(defonce ta-links-to-class-ids (ref {}))
(defonce class-links-to-class-ids (ref {}))

(defonce channels (atom #{}))

(defn connect! [channel]
  (swap! channels conj channel))

(defn disconnect! [channel status]
  (swap! channels disj channel))

(defn broadcast [ch payload]
  (let [msg (json/write-str {:type "broadcast" :payload payload})]
    (run! #(send! % msg) @channels))
  (send! ch (json/write-str {:type "broadcastResult" :payload payload})))

(defn dispatch [ch msg]
  (let [parsed (json/read-str msg)]
    ((case (get parsed "type")
       "broadcast" broadcast)
      ch (get parsed "payload"))))

(defn ws-handler2 [req]
  (with-channel req channel
  (println "got here" req)
                (on-close channel (fn [status]
                                    (println "channel closed")))
                (on-receive channel (fn [data]
                                      (send! channel data)))))
(defn ws-handler [request]
  (println request)
  (with-channel request channel
                (println channel)
                (connect! channel)
                (on-close channel #(disconnect! channel %))
                (on-receive channel #(dispatch channel %))))
