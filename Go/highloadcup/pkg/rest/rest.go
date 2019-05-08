package rest

import (
	"fmt"
	"github.com/batazor/highloadcup/pkg/rest/httpLogger"
	"github.com/batazor/highloadcup/pkg/utils"
	"github.com/go-chi/chi"
	"go.uber.org/zap"
	"net/http"
)

var (
	logger *zap.Logger
	err    error

	HTTP_PORT = utils.Getenv("HTTP_PORT", "4070")
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}
}

func Run() {
	// Routes ==================================================================
	r := chi.NewRouter()

	//r.Use(middleware.ContentCharset("utf-8", "image/jpeg"))
	r.Use(httpLogger.NewZapMiddleware("router", logger))
	r.NotFound(NotFoundHandler)

	r.Mount("/accounts", accountRoutes())

	logger.Info("Router lisen to port: " + HTTP_PORT)
	err := http.ListenAndServe(":"+HTTP_PORT, r)
	logger.Error(err.Error())
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)

	logger.Error(`{"error": "not found page"}`)

	_, err := w.Write([]byte(""))
	if err != nil {
		logger.Error(err.Error())
	}
}
