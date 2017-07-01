# CHECLIST for `Dockerfile`

* [ ] \#1 Use [alpine](https://hub.docker.com/_/alpine/) as base image

* [ ] \#2 Minimize Layers

* [ ] \#3 Use flag for clean install package

* [ ] \#4 Use applications for check your Dockerfile

### \#1 Base image

#### Use a smaller base image

```
FROM alpine
```

### \#2 Minimize layers

Combine your RUN statements to reduce the image size.

```
RUN apt-get install -y php php-mysql php-encrypt
```

### \#3 Use flag for clean install package

```
# Debian/Ubuntu
apt-get install --no-install-recommends -y php php-mysql
rm -rf /var/lib/apt/lists/*

# Alpine
apk add --no-cache nginx
```

### \#4 Use applications for check your Dockerfile

* [FromLatest.io](https://www.fromlatest.io) - Analyze your Dockefile for create better and more portable Docker images.



