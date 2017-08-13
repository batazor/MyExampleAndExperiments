# k8s-generator-config

Generator config for Kubernetes (**CoreOS**)

For **etcd3** and **k8s 1.6+**

### ENV variable

Create file `.env`. `.env.sample` as example

### Getting start

```
cp .env.sample .env
// copy ca.pem and ca-key.pam for workers in folder ./cert
./run.sh
```
