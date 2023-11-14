package util

import (
	"context"
	_ "embed"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

var (
	// 下面这行注释会将lua/lock.lua文件的内容解析为字符串存储到lockScript变量中
	//go:embed lua/lock.lua
	lockScript string
	//go:embed lua/unlock.lua
	unlockScript string
	//go:embed lua/updateExpireTime.lua
	updateExpireTimeScript string
)

type RedisDistributedLock struct {
	c           context.Context
	redisClient *redis.Client
	lockName    string
	lockUuid    string
	expireTime  int
}

func NewRedisDistributedLock(c context.Context,
	redisClient *redis.Client,
	lockName string,
	lockUuid string,
	expireTime int) RedisDistributedLock {
	return RedisDistributedLock{
		c:           c,
		redisClient: redisClient,
		lockName:    lockName,
		lockUuid:    lockUuid,
		expireTime:  expireTime,
	}
}

func (l *RedisDistributedLock) Lock() {
	r, err := l.redisClient.Eval(l.c, lockScript, []string{l.lockName}, l.lockUuid, l.expireTime).Int()
	// 如果没有设置成功，说明没有抢到锁，就一段时间之后进行重试
	for r != 1 || err != nil {
		time.Sleep(20 * time.Millisecond)
		r, err = l.redisClient.Eval(l.c, lockScript, []string{l.lockName}, l.lockUuid, l.expireTime).Int()
	}
	fmt.Printf("%v 加锁\n", l.lockName)
	// 加锁成功后，定时更新缓存过期时间
	go l.updateExpireTime()
}

func (l *RedisDistributedLock) Unlock() {
	_, err := l.redisClient.Eval(l.c, unlockScript, []string{l.lockName}, l.lockUuid).Int()
	if err != nil {
		fmt.Println("unlock error: ", err)
	}
	fmt.Printf("%v 解锁\n", l.lockName)
}

func (l *RedisDistributedLock) updateExpireTime() {
	r, _ := l.redisClient.Eval(l.c, updateExpireTimeScript, []string{l.lockName}, l.lockUuid, l.expireTime).Int()
	d := time.Duration(2 * l.expireTime / 3)
	// r不为10表明程序还在执行中，每隔过期时间的2/3的时候，再执行一次更新过期时间操作
	if r != 10 {
		time.Sleep(d * time.Second)
		l.updateExpireTime()
	}
}
