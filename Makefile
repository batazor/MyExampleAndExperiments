ARCH?=amd64
OUT_DIR?=./_output

.PHONY: all test verify-gofmt gofmt verify

all: build
build: vendor
	CGO_ENABLED=0 GOARCH=$(ARCH) go build -a -tags netgo -o app github.com/batazor/k8s-custom-metric

vendor: glide.lock
	glide install -v

test: vendor
	CGO_ENABLED=0 go test ./pkg/...

verify-gofmt:
	./hack/gofmt-all.sh -v

gofmt:
	./hack/gofmt-all.sh

verify: verify-gofmt test
