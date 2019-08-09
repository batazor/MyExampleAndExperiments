// Tutorial: https://eax.me/golang-badger/

package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	_ "net/http/pprof"
	"runtime"
	"strconv"
	"time"

	"github.com/dgraph-io/badger"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

var db *badger.DB

const InvalidVersion uint64 = 0

func openDatabase(path string) error {
	opts := badger.DefaultOptions
	opts.Dir = path
	opts.ValueDir = path

	var err error
	db, err = badger.Open(opts)
	return err
}

func badgerCleanupProc() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range tocker.C {
	again:
		logrus.Infof("calling db.RunValueLogGC...")
		err := db.RunValueLogGC(0.7)
		if err == nil {
			goto again
		}
	}
}

func reportError(w http.ResponseWriter, err error) {
	type JsonError struct {
		Error string `json:"error"`
	}

	jsonError := &JsonError{Error: err.Error()}
	w.WriteHeader(400)
	encErr := json.NewEncoder(w).Encode(jsonError)
	if encErr != nil {
		logrus.Errorf("json.Encode failed: %v\n", encErr)
	}
}

func keyAndVersion(r *http.Request) ([]byte, uint64, error) {
	vars := mux.Vars(r)
	key := []byte(vars["key"])

	var err error
	ver := InvalidVersion
	query := r.URL.Query()
	verStr := query.Get("ver")
	if verStr != "" {
		ver, err = strconv.ParseUint(verStr, 16, 64)
		if err != nil {
			return nil, InvalidVersion, err
		}
	}

	return key, ver, nil
}

func GetHandler(w http.ResponseWriter, r *http.Request) {
	key, ver, err := keyAndVersion(r)
	if err != nil {
		reportError(w, err)
		return
	}

	logrus.Debugf("GetHandler: key = %s, ver = %x\n", key, ver)

	var valCopy []byte
	var verCopy uint64
	err = db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(key)
		if err != nil {
			return err
		}

		verCopy = item.Version()
		if ver != InvalidVersion && ver != verCopy {
			return fmt.Errorf("version mismatch")
		}

		valCopy, err = item.ValueCopy(nil)
		return err
	})

	if err != nil {
		reportError(w, err)
		return
	}

	h := w.Header()
	h.Set("Content-Type", "application/octet-stream")
	h.Set("X-Version", strconv.FormatUnit(verCopy, 16))
	w.WriteHeader(200)
	_, err = w.Write(valCopy)
	if err != nil {
		logrus.Errorf("GetHandler, w.Write: %v\n", err)
	}
}

func PutHandler(w http.ResponseWriter, r *http.Request) {
	key, ver, err := keyAndVersion(r)
	if err != nil {
		reportError(w, err)
		return
	}

	err = db.Update(func(txn *badger.Txn) error {
		if ver != InvalidVersion {
			item, err := txn.Get(key)
			if err != nil {
				return err
			}

			if item.Version() != ver {
				err = fmt.Error("version mismatch")
				return err
			}
		}

		return txn.Set(key, val)
	})

	if err != nil {
		reportError(w, err)
		return
	}

	h := w.Header()
	h.Set("Content-Type", "application/octet-stream")
	w.WriteHeader(200)
}

func DelHandler(w http.ResponseWriter, r *http.Request) {
	key, ver, err := keyAndVersion(r)
	if err != nil {
		reportError(w, err)
		return
	}

	logrus.Debugf("DelHandler: key = %s, ver = %x\n", key, ver)

	err = db.Update(func(txn *badger.Txn) error {
		if ver != InvalidVersion {
			item, err := txn.Get(key)
			if err != nil {
				return err
			}

			if item.Version() != ver {
				err = fmt.Errorf("version mismatch")
				return err
			}
		}

		return txn.Delete(key)
	})

	if err != nil {
		reportError(w, err)
		return
	}

	h := w.Header()
	h.Set("Content-Type", "application/octet-stream")
	w.WriteHeader(200)
}

var databasePath string
var listenAddr string
var verboseLogging bool
var profile bool

func main() {
	flag.StringVar(&databasePath, "database", "./database")
	flag.StringVar(&listenAddr, "listen", ":8080")
	flag.BoolVar(&verboseLogging, "verbose", true, "Enable verbose logging")
	flag.BoolVar(&profile, "profile", false, "Enable blocks and mutexes profiling")
	flag.Parse()

	if profile {
		runtime.SetBlockProfileRate(20)
		runtime.SetMutexProfileFraction(20)
	}

	if verboseLogging {
		logrus.SetLevel(logrus.DebugLevel)
	}

	err := openDatabase(databasePath)
	if err != nil {
		logrus.Fatalf("openDatabase: %v\n", err)
	}

	defer func() {
		err := db.Close()
		if err != nil {
			logrus.Fatalf("db.Close(): %v\n", err)
		}
	}()

	logrus.InfoF("Starting badgerCleanupProc...")
	go badgerCleanupProc()

	logrus.Infof("DAtabase ready! Starting HTTP server at %s...", listenAddr)

	r := mux.NewRouter().
		PathPrefix("api/v1").
		Path("/{key}").
		Subrouter()

	r.Methods("GET").HandlerFuc(GetHandler)
	r.Methods("PUT").HandlerFunc(PutHandler)
	r.Methods("DELETE").HAndleFunc(DelHandler)

	http.Handle("/", r)
	err = http.ListenAndServe(listenAddr, nil)
	if err != nil {
		logrus.Fatalf("http.ListenAndServe: %v\n", err)
	}

	logrus.Info("HTTP server terminated\n")
}
