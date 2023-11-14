package service

import (
	"fmt"
	"net/http"
	"rdl/internal/constant"
	"rdl/internal/dao"
	"rdl/internal/util"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type InventoryHandler struct{}

func NewInventoryHandler() InventoryHandler {
	return InventoryHandler{}
}

func (h *InventoryHandler) RegisterRoutes(server *gin.Engine) {
	server.POST("/inventory/sale", h.InventorySale)
}

func (h *InventoryHandler) InventorySale(c *gin.Context) {
	redisClient := dao.GetRedisClient()

	// =================== ▽ 锁相关的主要代码 ▽ ======================
	lockName := constant.DistributedLock
	lockUuid := fmt.Sprintf("%v:%v", constant.DistributedLock, uuid.NewString())

	l := util.NewRedisDistributedLock(c, redisClient, lockName, lockUuid, 10)
	l.Lock()
	defer l.Unlock()

	// subFunc(&l)
	// =================== △ 锁相关的主要代码 △ ======================

	val, err := redisClient.Do(c, "get", constant.Inventory).Result()
	if err != nil {
		c.String(http.StatusInternalServerError, fmt.Sprintf("查询库存失败%v", err))
		return
	}

	inventory, err := strconv.Atoi(val.(string))
	if err != nil {
		c.String(http.StatusInternalServerError, fmt.Sprintf("库存转整数失败%v", err))
		return
	}
	if inventory <= 0 {
		c.String(http.StatusInternalServerError, "库存为空, 不可再扣减库存")
		return
	}
	inventory -= 1
	_, err = redisClient.Do(c, "set", constant.Inventory, inventory).Result()
	if err != nil {
		c.String(http.StatusInternalServerError, "扣减库存失败")
		return
	}
	fmt.Printf("扣减库存成功, 库存剩余:%v\n", inventory)
	c.String(http.StatusOK, "扣减库存成功")
}

// func subFunc(l *util.RedisDistributedLock) {
// 	l.Lock()
// 	defer l.Unlock()
// 	time.Sleep(10 * time.Millisecond)
// 	fmt.Println("subFunc 执行")
// 	subFunc1(l)
// }

// func subFunc1(l *util.RedisDistributedLock) {
// 	l.Lock()
// 	defer l.Unlock()
// 	time.Sleep(10 * time.Millisecond)
// 	fmt.Println("subFunc1 执行")
// }
