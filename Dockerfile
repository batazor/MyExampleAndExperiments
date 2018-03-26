FROM golang:1.9.2-alpine as builder

# Install glide
RUN apk add --update ca-certificates make curl mercurial git && \
    curl https://glide.sh/get | sh

# Build project
WORKDIR /go/src/github.com/batazor/k8s-custom-metric
COPY . .
RUN make

FROM alpine:latest

RUN addgroup -S 997 && adduser -S -g 997 997
USER 997

WORKDIR /app/
COPY --from=builder /go/src/github.com/batazor/k8s-custom-metric/app .
CMD ["./app"]