### Example run

```
docker run -d -p 5000:5000 --name registry-ssl \
-v /certs:/certs \
-e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/registry.crt \
-e REGISTRY_HTTP_TLS_KEY=/certs/registry.key \
registry:2.6.0
```

### Tutorial

1. https://habrahabr.ru/post/320884/
1. https://docs.docker.com/registry/deploying/
1. http://fl47l1n3.net/2015/11/17/private-docker-registry/
