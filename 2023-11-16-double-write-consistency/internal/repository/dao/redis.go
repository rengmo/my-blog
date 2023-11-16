package dao

import (
	"github.com/redis/go-redis/v9"
)

var redisClient *redis.Client

func init() {
	redisClient = initRedisClient()
}

func GetRDB() *redis.Client {
	if redisClient != nil {
		return redisClient
	}
	return initRedisClient()
}

func initRedisClient() *redis.Client {
	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	return redisClient
}
