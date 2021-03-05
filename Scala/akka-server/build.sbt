name := "akka-server"
version := "0.1"
scalaVersion := "2.13.5"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {
  val akkaVersion = "2.6.10"

  Seq(
    "com.typesafe.akka" %% "akka-stream" % akkaVersion
    "com.typesafe.akka" %% "akka-actor" % akkaVersion
    "com.typesafe.akka" %% "akka-http" % "10.2.2"
  )
}
