package main

import (
	"rdl/internal/service"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	inventory := service.NewInventoryHandler()
	inventory.RegisterRoutes(server)
	server.Run(":8080")
}
