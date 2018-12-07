package main

import (
	"fmt"
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

	select {}
}
