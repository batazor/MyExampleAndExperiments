package main

import (
	"net/http"
	"sync"
)

var vars map[*http.Request]map[string]interface{}
var varsLock sync.RWMutex

// OpenVars ...
func OpenVars(r *http.Request) {
	varsLock.Lock()

	if vars == nil {
		vars = map[*http.Request]map[string]interface{}{}
	}

	vars[r] = map[string]interface{}{}
	varsLock.Unlock()
}

// CloseVars ...
func CloseVars(r *http.Request) {
	varsLock.Lock()
	delete(vars, r)
	varsLock.Unlock()
}

// GetVar ...
func GetVar(r *http.Request, key string) interface{} {
	varsLock.RLock()
	value := vars[r][key]
	varsLock.RUnlock()
	return value
}

// SetVar ...
func SetVar(r *http.Request, key string, value interface{}) {
	varsLock.Lock()
	vars[r][key] = value
	varsLock.Unlock()
}
