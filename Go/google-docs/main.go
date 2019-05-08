package main

import (
	"fmt"
	"github.com/batazor/google-docs/pkg/gOffice"
	"github.com/batazor/google-docs/pkg/utils"
	"go.uber.org/zap"
)

var (
	logger *zap.Logger
	err    error

	// ENV
	GOOGLE_CLIENT_ID     = utils.Getenv("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_ID")
	GOOGLE_CLIENT_SECRET = utils.Getenv("GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_SECRET")
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}
}

func main() {
	logger.Info("Run application")

	go gOffice.Run()

	select {}
}
