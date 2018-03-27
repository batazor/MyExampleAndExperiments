# Custom Metrics for scaling K8S

## Getting start

```
# Install minikube
minikube start \
    --extra-config kubelet.EnableCustomMetrics=true \
    --extra-config=apiserver.GenericServerRunOptions.ServiceNodePortRange=80-32000
minikube addons enable heapster
```

## Endpoint for metrics

```
{
  "endpoint": "http://localhost:9000/metrics"
}
```

## Metrics application

[Prometheus Exposition formats](https://prometheus.io/docs/instrumenting/exposition_formats/)

```
# TYPE qps gauge
qps 15.42
```
