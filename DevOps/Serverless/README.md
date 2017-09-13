# Serverless in Kubernetes

-----

# Fission

### Getting start

1. [Install and start minikube](https://github.com/kubernetes/minikube)
2. [Run fission](https://github.com/fission/fission#get-and-run-fission-minikube-or-local-cluster)

### Run demo

```
# Add the stock NodeJS env to your Fission deployment
$ fission env create --name nodejs --image fission/node-env

# A javascript one-liner that prints "hello world"
$ curl https://raw.githubusercontent.com/fission/fission/master/examples/nodejs/hello.js > hello.js

# Upload your function code to fission
$ fission function create --name hello --env nodejs --code hello.js

# Map GET /hello to your new function
$ fission route create --method GET --url /hello --function hello

# Run the function.  This takes about 100msec the first time.
$ curl http://$FISSION_ROUTER/hello
Hello, world!
```

-----

# Kubeless

1. [Kubeless](https://github.com/bitnami/kubeless)

### Run demo

```
kubectl create -f kubeless-demo
```

# kubeless-ui

See https://github.com/bitnami/kubeless-ui
