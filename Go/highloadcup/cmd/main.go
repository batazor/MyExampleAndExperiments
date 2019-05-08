package main

import (
	"fmt"
	"github.com/batazor/highloadcup/pkg/rest"
	"go.uber.org/zap"
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
	logger.Info("Run application")

	// Run HTTP server
	go rest.Run()

	select {}
}
