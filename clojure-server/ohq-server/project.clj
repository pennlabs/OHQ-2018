(defproject ohq-server "0.1.0"
  :description "backend for ohq"
  :url "github.com/pennlabs/ohq"
  :license {:name "Eclipse Public License"
            :url  "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [ring "1.4.0"]
                 [http-kit "2.2.0"]
                 [compojure "1.6.0"]
                 [org.clojure/data.json "0.2.6"]
                 [environ "1.1.0"]
                 [prismatic/schema "1.1.9"]]
  :plugins [[lein-kibit "0.1.5"]
            [jonase/eastwood "0.2.5"]]
  :profiles {:uberjar {:aot :all}}
  :uberjar-name "ohq.jar"
  :main ohq-server.core)
