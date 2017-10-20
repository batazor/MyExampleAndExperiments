# Registry

---

### Example run

```bash
docker run -d -p 5000:5000 --name registry-ssl \
-v /certs:/certs \
-e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/registry.crt \
-e REGISTRY_HTTP_TLS_KEY=/certs/registry.key \
registry:2.6.0
```

### Tutorial

* [https://habrahabr.ru/post/320884/](https://habrahabr.ru/post/320884/)
* [https://docs.docker.com/registry/deploying/](https://docs.docker.com/registry/deploying/)
* [http://fl47l1n3.net/2015/11/17/private-docker-registry/](http://fl47l1n3.net/2015/11/17/private-docker-registry/)



