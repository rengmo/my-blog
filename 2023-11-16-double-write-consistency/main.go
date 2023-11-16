package main

import (
	"redis/internal/repository"
	"redis/internal/repository/dao"
	"redis/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

func main() {
	server := gin.Default()
	db := dao.GetDB()
	rdb := dao.GetRDB()
	initUserHandler(server, db, rdb)
	server.Run(":8080")
}

func initUserHandler(server *gin.Engine, db *gorm.DB, rdb *redis.Client) {
	ud := dao.NewUserDAO(db, rdb)
	ur := repository.NewUserRepository(ud)
	us := service.NewUserHandler(ur)

	us.RegisterRoutes(server)
}
