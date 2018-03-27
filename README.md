# Custom Metrics for scaling K8S

## Getting start

```
# Install minikube
minikube start \
    --extra-config kubelet.EnableCustomMetrics=true \
    --extra-config=apiserver.GenericServerRunOptions.ServiceNodePortRange=80-32000
minikube addons enable heapster
```
