1. CERT-auth 0_O  
  1.1. Path???  
  1.2. Auth?  
  1.3. Bad certificate? [solve](https://stackoverflow.com/questions/55803125/tls-handshake-failed-with-error-remote-error-tls-bad-certificate-server-ordere)
2. go mod. [solve](https://stackoverflow.com/questions/57105051/hyperledger-fabric-sdk-go-showing-cannot-convert-nil-to-type-csr-keyrequest/57284309#57284309)
3. `config.yaml`  
  3.1. `no channel peers configured for channel [mychannel]` [solve](https://stackoverflow.com/questions/55936208/failed-to-get-discovery-service-could-not-get-chconfig-cache-reference-read-co)
  3.2. next [solve](https://stackoverflow.com/questions/47978986/hyperledger-fabric-peer-connection-error-with-orderer)
4. How work invoke???
```
> docker logs -f 5614cac77e26

ex02 Invoke
Query Response:{"Name":"a","Amount":"100"}
ex02 Invoke
Aval = 90, Bval = 210
ex02 Invoke
ex02 Invoke
Query Response:{"Name":"b","Amount":"200"}

```