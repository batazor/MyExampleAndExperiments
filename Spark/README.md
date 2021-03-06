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

#### Jupyter Notebook

```
docker run -d --name spark-notebook -p 8888:8888 -v $(pwd)/spark-notebook:/opt/notebooks batazor/spark-notebook
```

Open http://localhost:8888

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


## Books

[![Learning Spark](http://akamaicovers.oreilly.com/images/0636920028512/cat.gif)](http://www.jdoqocy.com/click-7645222-11260198?url=http%3A%2F%2Fshop.oreilly.com%2Fproduct%2F0636920028512.do%3Fcmp%3Daf-strata-books-videos-product_cj_9781449358600_%2525zp&cjsku=0636920028512)
