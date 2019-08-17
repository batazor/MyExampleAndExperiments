package main

import (
	"fmt"
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
		//ChaincodeGoPath: os.Getenv("GOPATH"),
		ChaincodePath:   "./chaincode/",
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

	//helloValue, err := fabric.QueryHello()
	//if err != nil {
	//	fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	//}
	//
	//fmt.Println("TEST: >>>>>>>>>>>>>", helloValue)

	// Close SDK
	defer fabric.CloseSDK()
}
