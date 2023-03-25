package main

import (
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

// LinkList implements a simple chaincode to manage an asset
type LinkList struct {
}

// Init is called during chaincode instantiation to initialize any data.
func (l *LinkList) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

// Invoke is called per transaction on the chaincode. Each transaction is
// either a 'get' or a 'set' on the asset created by Init function. The 'set'
// method may create a new asset by specifying a new key-value pair.
func (t *LinkList) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

// main function starts up the chaincode in the container during instantiate
func main() {
	if err := shim.Start(new(LinkList)); err != nil {
		fmt.Printf("Error starting SimpleAsset chaincode: %s", err)
	}
}
