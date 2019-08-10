# Example middleware

### Refs

+ Tutorial: https://doordash.engineering/2019/07/22/writing-delightful-http-middlewares-in-go/

### Example

```
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
```
