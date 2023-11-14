package dao

import (
	constant "rdl/internal/constant"

	"github.com/redis/go-redis/v9"
)

var redisClient *redis.Client

func init() {
	initRedisClient()
}

func GetRedisClient() *redis.Client {
	if redisClient != nil {
		return redisClient
	}
	return initRedisClient()
}

func initRedisClient() *redis.Client {
	// go-redis 底层维护了一个连接池，不需要手动管理。（不需要每次使用之后都关闭连接）
	// https://redis.uptrace.dev/zh/guide/go-redis-debugging.html
	redisClient = redis.NewClient(&redis.Options{
		Addr: constant.RedisAddr,
	})
	return redisClient
}
