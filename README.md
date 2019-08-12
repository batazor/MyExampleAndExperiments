# hyperledger-fabric

### Run dev-mode

##### 1. Run network

> https://hyperledger-fabric.readthedocs.io/en/release-1.4/build_network.html

```
./byfn.sh up -o etcdraft
docker-compose -f docker-compose-cli.yaml -f docker-compose-etcdraft2.yaml up -d
```
