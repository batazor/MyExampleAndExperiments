# Spark Example

### Getting start

```
docker run -it --name=spark-example -p 8080:8080 -d batazor/spark
```

#### Copy example

```
docker cp ./learning-sparkexample spark-example:/tmp/learning-sparkexample
```

#### Python

```
docker exec -it spark-example bin/spark-submit /tmp/learning-sparkexample/learning-sparkexample/SimpleApp.py
```
