# Spark Example

### Getting start

```
docker run -it --name=spark-example -p 8080:8080 -d batazor/spark
```

#### Python

```
docker cp ./learning-sparkexample spark-example:/tmp/learning-sparkexample
docker exec -it spark-example bin/spark-submit /tmp/learning-sparkexample/learning-sparkexample/SimpleApp.py
```
