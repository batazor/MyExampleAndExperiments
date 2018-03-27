# Frontend

### Run

```
helm --kube-context minikube install \
  --name "scale-k8s" \
  --set CI_PROJECT_NAME="test" \
  frontend
```

### Stop

```
helm del --purge scale-k8s
```
