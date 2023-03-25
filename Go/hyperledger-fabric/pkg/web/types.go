package web

type queryRequest struct {
	Query string
}

type invokeRequest struct {
	From   string
	To     string
	Amount string
}

type deleteRequest struct {
	Query string
}
