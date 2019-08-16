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
		ChannelConfig: os.Getenv("GOPATH") + "/src/github.com/batazor/hyperledger-fabric/first-network/channel-artifacts/channel.tx",

		// Chaincode parameters
		ConfigFile: "./config.yaml",
		ChaincodeGoPath: os.Getenv("GOPATH"),
		//ChaincodePath:   "github.com/batazor/hyperledger-fabric/chaincode/",
		ChainCodeID:     "hello",
		OrgName:    "Org1",
		OrgAdmin:   "Admin",

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

// TODO: Delete code
//mspid := "org1"                   // set to MSP ID of your organization
//channelName := "myChannel"        // set to channel name you want to connect to
//chaincodeName := "example"        // set to chaincode name you want to use
//fcn := "query"                    // set to function you want to call
//args := [][]byte{}                // set arguments you want to pass to the call
//configPath := "./config.yaml" // set to path to your SDK config YAML file

//fmt.Printf("RESPONSE 333")

//var sdk *fabsdk.FabricSDK
//_, err := fabsdk.New(config.FromFile(configPath))
//if err != nil {
//	fmt.Println("Error:", err)
//	return
//}
//fmt.Printf("RESPONSE 222")
//
// prepare contexts
//channelContext := sdk.ChannelContext(channelName, fabsdk.WithOrg(mspid))
//
//fmt.Printf("RESPONSE 123")
//
//channelClient, err := channel.New(channelContext)
//if err != nil {
//	sdk.Close()
//	return
//}
//defer sdk.Close()
//
//ccReq := channel.Request{
//	ChaincodeID: chaincodeName,
//	Fcn:         fcn,
//	Args:        args,
//}
//
//response, err := channelClient.Query(ccReq) // for invoke: channelClient.Invoke(ccReq)
//if err != nil {
//	return
//}
//
//fmt.Printf("RESPONSE: %v \n", response)
