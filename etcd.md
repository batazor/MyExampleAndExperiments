## ETCD
___

### Update member

`etcdctl member list | awk -F'[: =]' '{print "etcdctl member update "$1" https:"$7":"$8}'`

### Check health member

`etcdctl cluster-health`