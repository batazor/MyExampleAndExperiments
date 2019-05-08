package main

import (
	"fmt"
	"github.com/batazor/gitlab-exporter/pkg/gitlab"
	"github.com/batazor/gitlab-exporter/pkg/metrics"
	"github.com/batazor/gitlab-exporter/pkg/odoo"
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

	metrics.Run()
	gitlab.Run()
	odoo.Run()

	select {}
}
