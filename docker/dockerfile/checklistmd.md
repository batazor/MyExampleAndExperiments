# CHECKLIST for `Dockerfile`

* [ ] \#1 Use [alpine](https://hub.docker.com/_/alpine/) as base image

* [ ] \#2 Minimize Layers

* [ ] \#3 Use flag for clean install package

* [ ] \#4 Use applications for check your Dockerfile

### \#1 Base image

#### Use a smaller base image

```
FROM alpine
```

### \#2 Use Fewer Layers

Combine your RUN statements to reduce the image size.

```
RUN apt-get install -y php php-mysql php-encrypt
```

### \#3 Make Container Boot Time Predictable

Dependencies don't affect the speed of execution of the container.

### \#4 Use flag for clean install package

```
# Debian/Ubuntu
apt-get install --no-install-recommends -y php php-mysql
rm -rf /var/lib/apt/lists/*

# Alpine
apk add --no-cache nginx
```

### \#6 Understand and Use Docker Cache Effectively

### \#5 Use applications for check your Dockerfile

* [FromLatest.io](https://www.fromlatest.io) - Analyze your Dockefile for create better and more portable Docker images.



