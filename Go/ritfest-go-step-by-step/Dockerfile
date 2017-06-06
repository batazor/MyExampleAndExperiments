FROM golang:1.8
WORKDIR /go/src/ritfest-go-step-by-step
RUN go get -d -v \
    github.com/takama/router \
    github.com/joho/godotenv \
    github.com/Sirupsen/logrus
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o ritfest-go-step-by-step .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/ritfest-go-step-by-step/ritfest-go-step-by-step .
COPY .env .env
CMD ["./ritfest-go-step-by-step"]