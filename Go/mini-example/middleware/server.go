package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()

	chain := MiddlewareHandlerFunc(okHandler).
		Intercept(NewElapsedTimeInterceptor()).
		Intercept(NewRequestIdInterceptor())
	mux.HandleFunc("/", chain)

	// Chain or middleware to be invoked in order of their index
	middlewareChain := MiddlewareChain{
		NewRequestIdInterceptor(),
		NewElapsedTimeInterceptor(),
	}
	// Invoke all middlewares ending up with HomeRouter
	mux.Path("/home").Handler(middlewareChain.Handler(okHandler))

	if err := http.ListenAndServe(":8090", mux); err != nil {
		log.Fatalf("unable to start server: %s", err.Error())
	}
}

func okHandler(w http.ResponseWriter, r *http.Request) {
	// Some very expensive database call
	w.Write([]byte("alles gut"))
}

func NewElapsedTimeInterceptor() MiddlewareInterceptor {
	return func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
		startTime := time.Now()
		defer func() {
			endTime := time.Now()
			elapsed := endTime.Sub(startTime)
			// Log the consumed time
			log.Println("time", elapsed)
		}()

		next(w, r)
	}
}

func NewRequestIdInterceptor() MiddlewareInterceptor {
	return func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
		if r.Header.Get("X-Request-Id") == "" {
			r.Header.Set("X-Request-Id", "generateRequestId()")
		}

		next(w, r)
	}
}
