# k8s-generator-config

Generator config for Kubernetes (**CoreOS**)


### ENV variable

Create file `.env`

| Name                 | Value                                             |
|----------------------|---------------------------------------------------|
| **OS**               |                                                   |
| HOME                 | /home/core                                        |
| ADVERTISE_IP         | 127.0.0.1                                         |
| APISERVER_PORT       | 6443                                              |
| **Kubernetes**       |                                                   |
| MASTER_HOST          | 127.0.0.1                                         |
| ETCD_SERVER          | http://127.0.0.1:2379                             |
| ETCD_ENDPOINTS       | http://127.0.0.1,http://127.0.0.2,http:/127.0.0.3 |
| K8S_VER              | v1.5.7_coreos.0                                   |
| POD_NETWORK          | 10.2.0.0/16                                       |
| K8S_SERVICE_IP       | 10.3.0.1                                          |
| DNS_SERVICE_IP       | 10.3.0.10                                         |
| NETWORK_PLUGIN       |                                                   |
| SERVICE_IP_RANGE     | 10.3.0.0/24                                       |
| **Worker**           |                                                   |
| WORKER_FQDN          | $HOSTNAME                                         |


### Getting start

```
./run.sh
```
