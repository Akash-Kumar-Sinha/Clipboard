package handlers

import (
	"encoding/json"
	"fmt"
	"os"
	"server_clipboard/utils"
	"time"

	"github.com/gin-gonic/gin"
)

func SendImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(400, gin.H{"error": "No image uploaded"})
		return
	}

	fileName := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)

	dst := fmt.Sprintf("./uploads/%s", fileName)
	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(500, gin.H{"error": "Failed to save image"})
		return
	}
	time.AfterFunc(3*time.Minute, func() {
		os.Remove(dst)
	})

	token := generateToken()

	relativePath := fmt.Sprintf("/uploads/%s", fileName)

	payload := StoredPayload{
		Type:    "image",
		Content: relativePath,
	}
	jsonData, _ := json.Marshal(payload)

	utils.RedisClient.Set(utils.Ctx, fmt.Sprintf("%d", token), jsonData, 3*time.Minute)

	c.JSON(200, SendResponse{
		Status:  "success",
		Message: "Image received successfully",
		Token:   token,
	})
}
