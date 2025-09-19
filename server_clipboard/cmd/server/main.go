package main

import (
	"log"
	"os"
	"server_clipboard/internal/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r := gin.Default()

	r.SetTrustedProxies(nil)

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://clipboard.akashkrsinha.xyz"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Email Service API is running!",
			"version": "1.0.0",
			"port":    port,
		})
	})
	r.Static("/uploads", "./uploads")

	r.POST("/send/messages", handlers.SendMessage)
	r.POST("/send/images", handlers.SendImage)
	r.GET("/receive/messages", handlers.ReceiveMessage)

	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
