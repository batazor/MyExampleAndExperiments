# k8s-generator-config

Generator config for Kubernetes (**CoreOS**)


### ENV variable

Create file `.env`

| Name                 | Value                                             |
|----------------------|---------------------------------------------------|
| **Network**          |                                                   |
| ADVERTISE_IP         | 443                                               |
| APISERVER_PORT       | 127.0.01                                          |
| **Kubernetes**       |                                                   |
| MASTER_HOST          | 127.0.0.1                                         |
| PATH_TO_K8S_CERT     | /etc/kubernetes/ssl                               |
| PATH_TO_K8S_MANIFEST | /etc/kubernetes/manifests                         |
| ETCD_ENDPOINTS       | http://127.0.0.1,http://127.0.0.2,http:/127.0.0.3 |
| K8S_VER              | v1.5.7_coreos.0                                   |
| K8S_SERVICE_IP       | 10.3.0.1                                          |
| DNS_SERVICE_IP       | 10.3.0.10                                         |
| NETWORK_PLUGIN       |                                                   |
| SERVICE_IP_RANGE     | 10.3.0.0/24                                       |


### Getting start

```
./run.sh
```
