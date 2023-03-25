package blockchain

import (
	"fmt"
	"github.com/hyperledger/fabric-sdk-go/pkg/client/channel"
)

// QueryHello query the chaincode to get the state of hello
func (setup *FabricSetup) Query(fcn string, args [][]byte) (string, error) {
	response, err := setup.client.Query(channel.Request{ChaincodeID: setup.ChainCodeID, Fcn: fcn, Args: args})
	if err != nil {
		return "", fmt.Errorf("failed to query: %v", err)
	}

	return string(response.Payload), nil
}
