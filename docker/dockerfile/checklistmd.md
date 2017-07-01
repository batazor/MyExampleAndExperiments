# CHECLIST for `Dockerfile`

1. [ ] \#1 Use [alpine](https://hub.docker.com/_/alpine/) as base image
2. [ ] \#2 Don’t install debug tools like vim/curl
3. [ ] \#3 Minimize Layers
4. [ ] \#4 Use flag for clean install package
5. [ ] \#5 Use applications for check your Dockerfile

### \#1 Base image

#### Use a smaller base image

```
FROM alpine
```

### \#3 Minimize layers

Combine your RUN statements to reduce the image size.

```
RUN apt-get install -y php php-mysql php-encrypt
```

### \#4 Use flag for clean install package

```
# Debian/Ubuntu
apt-get install --no-install-recommends -y php php-mysql
rm -rf /var/lib/apt/lists/*

# Alpine
apk add --no-cache nginx
```

### \#5 Use applications for check your Dockerfile





