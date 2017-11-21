# Kubernetes Installation with Vagrant & CoreOS

See https://coreos.com/kubernetes/docs/latest/kubernetes-on-vagrant.html


### Use a custom KUBECONFIG path

```
export KUBECONFIG="${KUBECONFIG}:$(pwd)/kubeconfig"
kubectl config use-context vagrant-multi
```
