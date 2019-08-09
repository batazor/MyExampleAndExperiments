# rate-limit-http-requests

Tutorial [link](https://pliutau.com/rate-limit-http-requests/)

### Build & Run

```
go get golang.org/x/time/rate
go build -o server .
./server
```

### Test

```
go get -u github.com/tsenart/vegeta
vegeta attack -duration=10s -rate=100 -targets=vegeta.conf | vegeta report
```
