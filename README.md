# k8s-generator-config

Generator config for Kubernetes (**CoreOS**)

For **etcd3** and **k8s 1.8+**

### ENV variable

Create file `.env`. `.env.sample` as example

### Getting start

```
git clone https://github.com/batazor/k8s-generator-config.git && cd k8s-generator-config
cp .env.sample .env
// copy ca.pem and ca-key.pam for workers in folder ${HOME}/cert after run master
./run.sh
```
