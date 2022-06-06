FROM golang:1.18.3-alpine as builder

# Install dep
RUN apk add --update ca-certificates git && \
    go get -u github.com/golang/dep/cmd/dep

# Build project
WORKDIR /go/src/github.com/batazor/highloadcup
COPY . .
RUN dep ensure
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o highloadcup cmd/main.go

FROM alpine:latest

ENV HTTP_PORT 80

# Add config supervisor && nginx
COPY ./ops/root /

# Install dep
RUN mkdir -p /data/db && \
    apk add --update supervisor mongodb

# Use ROOT user for expose 80 port
#RUN addgroup -S 997 && adduser -S -g 997 997
#USER 997

WORKDIR /app/
COPY --from=builder /go/src/github.com/batazor/highloadcup/highloadcup .

EXPOSE 80

CMD ["supervisord", "--nodaemon", "-c", "/etc/supervisord.conf"]