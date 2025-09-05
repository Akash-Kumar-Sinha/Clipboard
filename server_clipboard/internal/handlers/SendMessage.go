package handlers

import (
	"fmt"
	"server_clipboard/utils"
	"time"

	"github.com/gin-gonic/gin"
)



type sendMessageRequest struct {
	Content string `json:"content" binding:"required"`
}

func SendMessage(c *gin.Context) {
	var request sendMessageRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, SendResponse{
			Status:  "error",
			Message: "Invalid request",
		})
		return
	}

	token := generateToken()
	utils.RedisClient.Set(utils.Ctx, fmt.Sprintf("%d", token), request.Content, 30*time.Minute)

	c.JSON(200, SendResponse{
		Status:  "success",
		Message: "Message sent successfully",
		Token:   token,
	})
}
