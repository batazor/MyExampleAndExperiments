package session

import "go-blog-example/utils"

type sessionData struct {
	Username string
}

// Session ...
type Session struct {
	data map[string]*sessionData
}

// NewSession ...
func NewSession() *Session {
	s := new(Session)

	s.data = make(map[string]*sessionData)

	return s
}

// Init ...
func (s *Session) Init(username string) string {
	sessionID := utils.GenerateID()

	data := &sessionData{Username: username}
	s.data[sessionID] = data

	return sessionID
}

// Get ...
func (s *Session) Get(sessionId string) string {
	data := s.data[sessionId]

	if data == nil {
		return ""
	}

	return data.Username
}
