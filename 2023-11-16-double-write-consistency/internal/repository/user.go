package repository

import (
	"context"
	"redis/internal/domain"
	"redis/internal/repository/dao"
)

type UserRepository struct {
	dao *dao.UserDAO
}

func NewUserRepository(dao *dao.UserDAO) *UserRepository {
	return &UserRepository{
		dao: dao,
	}
}

func (r *UserRepository) FindByID(c context.Context, userID int64) (domain.User, error) {
	user, err := r.dao.FindByID(c, userID)
	return r.toDomain(user), err
}

func (r *UserRepository) UpdateUserName(c context.Context, userID int64, userName string) (domain.User, error) {
	user, err := r.dao.UpdateUserData(c, userID, userName)
	return r.toDomain(user), err
}

func (r *UserRepository) toDomain(u dao.User) domain.User {
	return domain.User{
		ID:   u.ID,
		Name: u.Name,
	}
}
