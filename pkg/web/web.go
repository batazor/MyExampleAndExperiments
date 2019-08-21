package web

import (
	"encoding/json"
	"fmt"
	"github.com/batazor/hyperledger-fabric/pkg/blockchain"
	"github.com/go-chi/chi"
	"io/ioutil"
	"net/http"
)

// Routes creates a REST router
func Routes() chi.Router {
	r := chi.NewRouter()

	r.Post("/", Invoke)
	r.Get("/", Query)
	r.Delete("/", Delete)

	return r
}

func Invoke(w http.ResponseWriter, r *http.Request) {
	fabric := r.Context().Value("fabric").(blockchain.FabricSetup)

	// Parse request
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "` + err.Error() + `"}`))
		return
	}
	var request invokeRequest
	err = json.Unmarshal(b, &request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "` + err.Error() + `"}`))
		return
	}

	result, err := fabric.Query("invoke", [][]byte{[]byte(request.From), []byte(request.To), []byte(request.Amount)})
	if err != nil {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}

	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"response": "` + result + `"}`))
}

func Query(w http.ResponseWriter, r *http.Request) {
	fabric := r.Context().Value("fabric").(blockchain.FabricSetup)

	// Parse request
	var request = &queryRequest{
		Query: r.URL.Query().Get("query"),
	}

	result, err := fabric.Query("query", [][]byte{[]byte(request.Query)})
	if err != nil {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}

	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"response": "` + result + `"}`))
}

func Delete(w http.ResponseWriter, r *http.Request) {
	fabric := r.Context().Value("fabric").(blockchain.FabricSetup)

	// Parse request
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "` + err.Error() + `"}`))
		return
	}
	var request deleteRequest
	err = json.Unmarshal(b, &request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "` + err.Error() + `"}`))
		return
	}

	result, err := fabric.Query("delete", [][]byte{[]byte(request.Query)})
	if err != nil {
		fmt.Printf("Unable to query the blockchain: %s\n", err.Error())
	}

	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"response": "` + result + `"}`))
}
