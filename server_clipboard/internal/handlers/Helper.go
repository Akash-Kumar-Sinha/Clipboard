package handlers

import (
	"fmt"
	"math/rand/v2"
	"server_clipboard/utils"

	"github.com/go-redis/redis/v8"
)

func randomNumber() int {
	min := 100000
	max := 999999
	token := rand.IntN(max-min) + min
	return token
}

func generateToken() int {
	for {
		token := randomNumber()
		fmt.Printf("Generated token helper: %d\n", token)
		val, err := utils.RedisClient.Get(utils.Ctx, fmt.Sprintf("%d", token)).Result()
		if err == redis.Nil {
			return token
		} else if err != nil {
			continue
		} else if val == "" {
			return token
		}
	}
}
