# k8s-generator-config

Generator config for Kubernetes


### ENV variable

See file `.env`

| Name             | Value |
|------------------|----------------------------------------|
| **Network**      |                                        |
| ADVERTISE_IP     | 443                                    |
| APISERVER_PORT   | 127.0.01                               |
| **Kubernetes**   |                                        |
| MASTER_HOST      | 127.0.0.1                              |
| ETCD_ENDPOINTS   | http://127.0.0.1,http://127.0.0.2,http:/127.0.0.3 |
| K8S_VER          | v1.5.7_coreos.0                        |
| DNS_SERVICE_IP   | 10.3.0.10                              |
| NETWORK_PLUGIN   |                                        |
| SERVICE_IP_RANGE | 10.3.0.0/24                            |
