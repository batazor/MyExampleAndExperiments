### Get actual `nodePort` and name service

```
kubectl get svc --all-namespaces -o=json \
    | jq -r -j '.items[] \
    | { metadata, spec } \
    | .metadata.namespace+"\t"+.metadata.name+"\t"+(.spec.ports[].nodePort | tostring)+"\n"'
```
