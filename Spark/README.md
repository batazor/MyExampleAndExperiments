# Spark Example

### Getting start

```
docker run -it --name=spark-example -p 8080:8080 -d batazor/spark
```

#### Copy example into container

```
docker cp ./learning-sparkexample spark-example:/tmp/learning-sparkexample
```

#### Python

```
docker exec -it spark-example bin/spark-submit /tmp/learning-sparkexample/learning-sparkexample/SimpleApp.py
```

#### JAVA

```
docker exec -it spark-example bash -c \
  "cd /tmp/learning-sparkexample/learning-sparkexample/JAVA && mvn package"

docker exec -it spark-example bin/spark-submit \
  --class "SimpleApp" \
  --master local[4] \
  /tmp/learning-sparkexample/learning-sparkexample/JAVA/target/simple-project-1.0.jar
```

#### Scala

```
docker exec -it spark-example bash -c \
  "cd /tmp/learning-sparkexample/learning-sparkexample/SCALA && sbt package"

docker exec -it spark-example bin/spark-submit \
  --class "SimpleApp" \
  --master local[4] \
  /tmp/learning-sparkexample/learning-sparkexample/SCALA/target/scala-2.11/simple-project_2.11-1.0.jar
```
