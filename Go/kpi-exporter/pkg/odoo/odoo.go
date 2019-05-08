package odoo

import (
	"database/sql"
	"fmt"
	"github.com/batazor/gitlab-exporter/pkg/utils"
	_ "github.com/lib/pq"
	"go.uber.org/zap"
	"time"
)

var (
	logger *zap.Logger
	err    error
	db     *sql.DB

	// ENV
	ODOO_DB_STR = utils.Getenv("ODOO_DB_STR", "postgres://odoo:odoo@localhost/odoo?sslmode=disable")
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}
}

func Run() {
	logger.Info("Run odoo module")

	db, err = sql.Open("postgres", ODOO_DB_STR)
	if err != nil {
		logger.Error(err.Error())
	}

	// Run metrics
	go func() {
		for {
			go metricCRMLead()

			time.Sleep(10 * time.Second)
			logger.Info("Update metrics: odoo")
		}
	}()
}
