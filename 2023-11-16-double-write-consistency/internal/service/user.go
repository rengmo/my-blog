package service

import (
	"fmt"
	"net/http"
	"redis/internal/repository"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	repo *repository.UserRepository
}

func NewUserHandler(repo *repository.UserRepository) UserHandler {
	return UserHandler{
		repo: repo,
	}
}

func (h *UserHandler) RegisterRoutes(server *gin.Engine) {
	server.GET("/user/:id", h.FindUser)
	server.POST("/user/:id", h.UpdateUserName)
}

func (h *UserHandler) FindUser(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, "id not exists")
		return
	}
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, fmt.Sprintf("int convert error, %v", err))
		return
	}
	user, err := h.repo.FindByID(c, idInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Sprintf("%v", err))
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) UpdateUserName(c *gin.Context) {
	type UpdateUserNameReq struct {
		Name string `json:"name"`
	}
	var ureq UpdateUserNameReq
	if err := c.Bind(&ureq); err != nil {
		c.JSON(http.StatusBadRequest, "params error")
		return
	}

	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, "id not exists")
		return
	}

	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, fmt.Sprintf("int convert error, %v", err))
		return
	}
	user, err := h.repo.UpdateUserName(c, idInt, ureq.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Sprintf("%v", err))
		return
	}
	c.JSON(http.StatusOK, user)
}
