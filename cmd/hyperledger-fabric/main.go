package main

import (
	"fmt"
	"github.com/batazor/hyperledger-fabric/pkg/blockchain"
	"os"
)

func main() {
	fabric := blockchain.FabricSetup{
		// Network parameters
		OrdererID: "localhost:7050",

		// Channel parameters
		ChannelID:     "mychannel",
		ChannelConfig: "./first-network/channel-artifacts/channel.tx",

		// Chaincode parameters
		ChainCodeID:     "chaincode_example02",
		ChaincodeGoPath: os.Getenv("GOPATH"),
		ChaincodePath:   "github.com/batazor/hyperledger-fabric/chaincode/chaincode_example02/go",
		OrgAdmin:        "Admin",
		OrgName:         "Org1",
		ConfigFile:      "./config.yaml",

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

	// Get A
	result, err := fabric.Query("query", [][]byte{[]byte("a")})
	if err != nil {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}
	fmt.Println("Get A:", result)

	// Invoke
	result, err = fabric.Query("invoke", [][]byte{[]byte("a"), []byte("b"), []byte("10")})
	if err != nil {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}
	fmt.Println("Invoke from A to B (10)")

	// delete
	result, err = fabric.Query("delete", [][]byte{[]byte("b")})
	if err != nil || result != "" {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}
	fmt.Println("Delete b")

	// Get B
	result, err = fabric.Query("query", [][]byte{[]byte("b")})
	if err != nil {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}
	fmt.Println("Get B:", result)

	// Close SDK
	defer fabric.CloseSDK()
}
