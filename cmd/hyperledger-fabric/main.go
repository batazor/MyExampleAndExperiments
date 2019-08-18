package main

import (
	"fmt"
	"os"
)

func main() {
	fabric := FabricSetup{
		// Network parameters
		OrdererID: "localhost:7050",

		// Channel parameters
		ChannelID:  "mychannel",
		ChannelConfig: "./first-network/channel-artifacts/channel.tx",

		// Chaincode parameters
		ChainCodeID:     "hello",
		ChaincodeGoPath: os.Getenv("GOPATH"),
		ChaincodePath:   "github.com/batazor/hyperledger-fabric/chaincode/hello/go",
		OrgAdmin:   "Admin",
		OrgName:    "Org1",
		ConfigFile: "./config.yaml",

		// User parameters
		UserName: "User1",
	}

	// Initialization of the Fabric SDK from the previously set properties
	err := fabric.Initialize()
	if err != nil {
		fmt.Printf("Unable to initialize the Fabric SDK: %v\n", err)
		return
	}

	// Install and instantiate the chaincode
	err = fabric.InstallAndInstantiateCC()
	if err != nil {
		fmt.Printf("Unable to install and instantiate the chaincode: %v\n", err)
		return
	}

	//helloValue, err := fabric.QueryHello()
	//if err != nil {
	//	fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	//}
	//
	//fmt.Println("TEST: >>>>>>>>>>>>>", helloValue)

	// Close SDK
	defer fabric.CloseSDK()
}
