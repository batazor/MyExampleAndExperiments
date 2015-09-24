package session

import (
	"go-blog-example/utils"
	"net/http"
	"time"

	"github.com/go-martini/martini"
)

// CookieName ...
const (
	CookieName = "sessionID"
)

// Session ...
type Session struct {
	ID           string
	Username     string
	IsAuthorized bool
}

// SessionStore ...
type SessionStore struct {
	data map[string]*Session
}

// NewSessionStore ...
func NewSessionStore() *SessionStore {
	s := new(SessionStore)
	s.data = make(map[string]*Session)
	return s
}

// Get ...
func (store *SessionStore) Get(sessionID string) *Session {
	session := store.data[sessionID]
	if session == nil {
		return &Session{ID: sessionID}
	}
	return session
}

// Set ...
func (store *SessionStore) Set(session *Session) {
	store.data[session.ID] = session
}

func ensureCookie(r *http.Request, w http.ResponseWriter) string {
	cookie, _ := r.Cookie(CookieName)
	if cookie != nil {
		return cookie.Value
	}
	sessionID := utils.GenerateID()

	cookie = &http.Cookie{
		Name:    CookieName,
		Value:   sessionID,
		Expires: time.Now().Add(5 * time.Minute),
	}
	http.SetCookie(w, cookie)

	return sessionID
}

var sessionStore = NewSessionStore()

// Middleware ...
func Middleware(ctx martini.Context, r *http.Request, w http.ResponseWriter) {
	sessionID := ensureCookie(r, w)
	session := sessionStore.Get(sessionID)

	ctx.Map(session)

	ctx.Next()

	sessionStore.Set(session)
}
