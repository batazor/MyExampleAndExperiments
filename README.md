# hyperledger-fabric

### Run dev-mode

> https://hyperledger-fabric.readthedocs.io/en/release-1.4/build_network.html

```
cd first-network
./byfn.sh up

go build github.com/batazor/hyperledger-fabric/chaincode/hello/go

docker exec -it cli bash
> peer chaincode install -p github.com/chaincode/hello/go -n hello -v 0.1.0
> exit

go build github.com/batazor/hyperledger-fabric/cmd/hyperledger-fabric
```

### HTTP API

Postman as example: [link](./docs/hyperledger-fabric.postman_collection.json)

### Refs

- [Setup SDK](https://github.com/chainHero/heroes-service/blob/master/blockchain/setup.go)
