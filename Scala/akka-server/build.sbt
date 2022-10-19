name := "akka-server"
version := "0.1"
scalaVersion := "2.13.8"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {
  val akkaVersion = "2.6.20"

  Seq(
    "com.typesafe.akka" %% "akka-stream" % akkaVersion
    "com.typesafe.akka" %% "akka-actor" % akkaVersion
    "com.typesafe.akka" %% "akka-http" % "10.2.9"
  )
}
