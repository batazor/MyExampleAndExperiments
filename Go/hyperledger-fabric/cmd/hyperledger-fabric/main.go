package main

import (
	"context"
	"fmt"
	"github.com/batazor/hyperledger-fabric/pkg/blockchain"
	"github.com/batazor/hyperledger-fabric/pkg/web"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"net/http"
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

	// Close SDK
	defer fabric.CloseSDK()

	ctx := context.WithValue(context.Background(), "fabric", fabric)

	// Run HTTP-server
	PORT := "8080"

	r := chi.NewRouter()

	// CORS
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
		//Debug:            true,
	})

	r.Use(cors.Handler)
	r.Use(render.SetContentType(render.ContentTypeJSON))
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Heartbeat("/healthz"))
	r.Use(middleware.Recoverer)
	r.NotFound(NotFoundHandler)

	r.Mount("/", web.Routes())
	fmt.Println("Run on port " + PORT)

	// Add context
	srv := http.Server{Addr: ":" + PORT, Handler: chi.ServerBaseContext(ctx, r)}

	// start HTTP-server
	err = srv.ListenAndServe()
	if err != nil {
		fmt.Println(err.Error())
		return
	}
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)

	return
}
