package main

import (
	"encoding/json"
	"fmt"
	"github.com/batazor/highloadcup/pkg/accounts"
	"go.uber.org/zap"
	"io/ioutil"
	"os"
	"strconv"
)

var (
	logger *zap.Logger
	err    error
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}
}

func main() {
	fileName := "accounts_1.json"

	// Read file
	jsonFile, err := os.Open("test/data/" + fileName)
	if err != nil {
		logger.Panic(err.Error())
	}

	logger.Info("Successfully opened " + fileName)
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	var result accounts.AccountList
	json.Unmarshal([]byte(byteValue), &result)

	for _, v := range result.Accounts {
		_, err := accounts.Add(v)
		if err != nil {
			logger.Error("Error import account with id: " + strconv.Itoa(int(v.ID)))
		}
	}

	logger.Info("Success import")
}
