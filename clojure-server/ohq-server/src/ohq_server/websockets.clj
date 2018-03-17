(ns ohq-server.websockets
  (:require [ring.adapter.jetty :as jetty]
            [ring.util.response :refer [response]]
            [ring.middleware.file :as file]
            [org.httpkit.server :refer :all]
            [compojure.core :refer [defroutes GET context ANY]]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [environ.core :as environ]))

(defonce ^:private class-ids->class-data (ref {}))
(defonce ^:private student-links->class-ids (ref {}))
(defonce ^:private ta-links->class-ids (ref {}))
(defonce ^:private class-links->class-ids (ref {}))
; rooms is a map of class ids to sets of channels
(defonce ^:private rooms (ref {}))

(defonce ^:private channels (atom #{}))

(defn- connect! [channel]
  (swap! channels conj channel))

(defn- disconnect! [channel status]
  (swap! channels disj channel))

(defn- broadcast [ch payload]
  (let [msg (json/write-str {:type "broadcast" :payload payload})]
    (run! #(send! % msg) @channels))
  (send! ch (json/write-str {:type "broadcastResult" :payload payload})))

(defn- dispatch [ch msg]
  (let [parsed (json/read-str msg)]
    ((case (get parsed "type")
       "broadcast" broadcast)
      ch (get parsed "payload"))))

(defn- on-create-class [{:strs [name location]}]

  )

(defn- on-websocket-join [channel data]
  (let [data (json/read-str data)]
    ((case (get data "type")
       "CREATE_CLASS" #(on-create-class (get data "payload"))
       "JOIN_CLASS" #()
       "JOIN_CLASS_QUEUE" #()
       "DESTROY_CLASS" #()
       "UPDATE_CLASS" #()
       "TA_UNQUEUE_STUDENT" #()
       "STUDENT_UNQUEUE_SELF" #()
       #()))
    (send! channel data)

    )
  )

(defn ws-handler [req]
  (with-channel req channel
                (on-close channel (fn [status]
                                    (println "channel closed")))
                (on-receive channel #(on-websocket-join channel %))))

(defn ws-handler2 [request]
  (println request)
  (with-channel request channel
                (println channel)
                (connect! channel)
                (on-close channel #(disconnect! channel %))
                (on-receive channel #(dispatch channel %))))
