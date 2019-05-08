package rest

import (
	"encoding/json"
	"github.com/batazor/highloadcup/pkg/accounts"
	"github.com/go-chi/chi"
	"io/ioutil"
	"net/http"
)

// Routes creates a REST router
func accountRoutes() chi.Router {
	r := chi.NewRouter()

	// Example
	// GET: /accounts/filter/?status_neq=всё+сложно&birth_lt=643972596&country_eq=Индляндия&limit=5&query_id=110
	r.Get("/filter/", getAccountsByFilter)
	r.Get("/group/", getAccountsByGoup)
	r.Get("/{id}/recommend/", getAccountByRecommend)
	r.Get("/{id}/suggest/", getAccountBySuggest)
	r.Post("/{id}/", updateAccount)
	r.Post("/new/", addAccount)
	r.Post("/likes/", addLikes)

	return r
}

func getAccountsByFilter(w http.ResponseWriter, r *http.Request) {
	filter := make(map[string]interface{})

	// Get filters
	keys := r.URL.Query()
	for key, value := range keys {
		filter[key] = value[0]
	}

	// 3. get accounts by filter
	accountList, err := accounts.GetAccountsByFilter(filter)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	if len(accountList.Accounts) == 0 {
		logger.Info("Not found accounts by filter")

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{\"accounts\": []}"))
		return
	}

	response, err := json.Marshal(accountList)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func getAccountsByGoup(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{}"))
}

func getAccountByRecommend(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{}"))
}

func getAccountBySuggest(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{}"))
}

func addAccount(w http.ResponseWriter, r *http.Request) {
	// 1. get post data
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 2. parse json
	var account accounts.Account
	err = json.Unmarshal(b, &account)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 3. create new account
	_, err = accounts.Add(account)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 4. return response [true|false]
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("{}"))
}

func updateAccount(w http.ResponseWriter, r *http.Request) {
	// 1. get post data
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 2. parse json
	var account accounts.Account
	err = json.Unmarshal(b, &account)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 3. update account
	var accountId = chi.URLParam(r, "id")
	_, err = accounts.Update(accountId, account)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 4. return response [true|false]
	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte("{}"))
}

func addLikes(w http.ResponseWriter, r *http.Request) {
	// 1. get post data
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 2. parse json
	var likes accounts.PushLikes
	err = json.Unmarshal(b, &likes)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 3. push likes
	err = accounts.AddLikes(likes)
	if err != nil {
		logger.Error(err.Error())
		errorRequest(w)
		return
	}

	// 4. return response [true|false]
	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte("{}"))
}
