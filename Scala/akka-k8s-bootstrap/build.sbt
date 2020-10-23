
name := "akka-bootstrap"

version := "0.14.0"

scalaVersion := "2.13.3"

scalaVersion := "2.13.3"

def akkaManagementVersion(version: String) = version.split('+')(0)

// libraryDependencies += "com.lightbend.akka.management" %% "akka-management-cluster-bootstrap" % akkaManagementVersion(version.value)
//
// libraryDependencies += "com.lightbend.akka.management" %% "akka-management-cluster-http" % akkaManagementVersion(version.value)
//
// libraryDependencies += "com.lightbend.akka.discovery" %% "akka-discovery-kubernetes-api" % "0.14.0"
//
// libraryDependencies += "com.lightbend.akka.discovery" %% "akka-discovery-dns" % "0.14.0"

val versionAkkaMgnt = "0.20.0"
val versionAkkaHttp = "10.2.0"
val versionAkka = "2.6.10"

libraryDependencies ++= Seq(
  "com.lightbend.akka.management" %% "akka-management-cluster-bootstrap" % versionAkkaMgnt,
  "com.lightbend.akka.discovery" %% "akka-discovery-kubernetes-api" % versionAkkaMgnt
)

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % versionAkkaHttp,
  "com.typesafe.akka" %% "akka-http-testkit" % versionAkkaHttp % Test
)

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-cluster-sharding" %  versionAkka,
  "com.typesafe.akka" %% "akka-cluster" % versionAkka
)
