package handlers

type SendResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Token   int    `json:"token,omitempty"`
}
