package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/k8s-community/myapp/version"
	"github.com/takama/router"
)

// DEFAULTPORT returns default port number
const DEFAULTPORT = "8080"

// simplest logger, which initialized during starts of the application
var (
	stdlog = log.New(os.Stdout, "[MYAPP]: ", log.LstdFlags)
	errlog = log.New(os.Stderr, "[MYAPP:ERROR]: ", log.Ldate|log.Ltime|log.Lshortfile)
)

func shutdown() (string, error) {
	return "Shutdown", nil
}

func logger(c *router.Control) {
	remoteAddr := c.Request.Header.Get("X-Forwarded-For")
	if remoteAddr == "" {
		remoteAddr = c.Request.RemoteAddr
	}
	stdlog.Println(remoteAddr, c.Request.Method, c.Request.URL.Path)
}

func healthz(c *router.Control) {
	c.Code(http.StatusOK).Body("Ok")
}

func info(c *router.Control) {
	c.Code(http.StatusOK).Body(
		map[string]string{
			"version": version.RELEASE,
			"commit":  version.COMMIT,
			"repo":    version.REPO,
		},
	)
}

func root(c *router.Control) {
	c.Code(http.StatusOK).Body(fmt.Sprintf("myapp v%s", version.RELEASE))
}

func main() {
	port := os.Getenv("MYAPP_SERVICE_PORT")
	if len(port) == 0 {
		port = DEFAULTPORT
	}
	r := router.New()
	r.Logger = logger
	r.GET("/info", info)
	r.GET("/healthz", healthz)
	r.GET("/", root)
	go r.Listen(fmt.Sprintf("0.0.0.0:%s", port))

	// Set up channel on which to send signal notifications.
	// We must use a buffered channel or risk missing the signal
	// if we're not ready to receive when the signal is sent.
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, os.Kill, syscall.SIGTERM)
	killSignal := <-interrupt
	stdlog.Println("Got signal:", killSignal)
	status, err := shutdown()
	if err != nil {
		errlog.Printf("Error: %s Status: %s\n", err.Error(), status)
		os.Exit(1)
	}
	if killSignal == os.Kill {
		stdlog.Println("Service was killed")
	} else {
		stdlog.Println("Service was terminated by system signal")
	}
	stdlog.Println(status)
}
