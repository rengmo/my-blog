package dao

import (
	"context"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

var mu sync.Mutex

type User struct {
	ID          int64  `gorm:"primaryKey,autoIncrement" json:"id"`
	Name        string `json:"name"`
	CreatedTime int64  `json:"created_time"`
	UpdatedTime int64  `json:"updated_time"`
}

func (User) TableName() string {
	return "users"
}

type UserDAO struct {
	db  *gorm.DB
	rdb *redis.Client
}

func NewUserDAO(db *gorm.DB, redis *redis.Client) *UserDAO {
	return &UserDAO{
		db:  db,
		rdb: redis,
	}
}

func (dao *UserDAO) FindByID(c context.Context, userID int64) (u User, err error) {
	db := dao.db
	rdb := dao.rdb
	key := fmt.Sprintf("user:%v", userID)

	// 1. 从缓存中查询数据，如果有数据就返回
	var user User
	val, err := rdb.Get(c, key).Result()
	if val != "" && err == nil {
		err := json.Unmarshal([]byte(val), &user)
		if err == nil {
			return user, nil
		}
	}
	// 2. 没有查到数据就加锁再查一次
	mu.Lock()
	defer mu.Unlock()
	val, err = rdb.Get(c, key).Result()
	// 2.1 从缓存中查到数据就直接返回
	if val != "" && err == nil {
		err := json.Unmarshal([]byte(val), &user)
		if err == nil {
			return user, nil
		}
	}
	// 2.2 没有从缓存中查到数据就从数据库中查询
	err = db.Where("id=?", userID).First(&user).Error
	if err != nil {
		return user, err
	}
	// 3. 将从数据库中拿到的数据写到缓存中
	userStr, err := json.Marshal(user)
	if err == nil {
		rdb.Set(c, key, userStr, 1000*time.Second)
	}
	return user, nil
}

func (dao *UserDAO) UpdateUserData(c context.Context, userID int64, name string) (user User, err error) {
	db := dao.db
	rdb := dao.rdb
	key := fmt.Sprintf("user:%v", userID)
	user.ID = userID

	// 先更新数据库中的数据
	u := User{
		Name: name,
	}
	err = db.Model(&user).
		Select("Name").
		Where("id=?", userID).Updates(u).Error
	if err != nil {
		return user, err
	}

	// 再删除缓存中的数据
	err = rdb.Del(c, key).Err()
	if err != nil {
		return user, err
	}
	return user, nil
}
