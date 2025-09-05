package handlers

import (
	"encoding/json"
	"server_clipboard/utils"

	"github.com/gin-gonic/gin"
)

type receiveMessageResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Type    string `json:"type,omitempty"`
	Content string `json:"content,omitempty"`
}

type StoredPayload struct {
	Type    string `json:"type"`    // "text" or "image"
	Content string `json:"content"` // actual content or relative image path
}

func ReceiveMessage(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		c.JSON(400, receiveMessageResponse{
			Status:  "error",
			Message: "Token is required",
		})
		return
	}

	val, err := utils.RedisClient.Get(utils.Ctx, token).Result()
	if err != nil {
		c.JSON(404, receiveMessageResponse{
			Status:  "error",
			Message: "Message not found or expired",
		})
		return
	}

	var payload StoredPayload
	if err := json.Unmarshal([]byte(val), &payload); err != nil {
		payload.Type = "text"
		payload.Content = val
	}

	c.JSON(200, receiveMessageResponse{
		Status:  "success",
		Message: "Content retrieved successfully",
		Type:    payload.Type,
		Content: payload.Content,
	})
}
