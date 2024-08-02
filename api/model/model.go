package model

import "github.com/dgrijalva/jwt-go"

type User struct {
	Name       string `gorm:"type:varchar(100);not null" validate:"required,min=2,max=100"`
	Email      string `gorm:"type:varchar(100);uniqueIndex;not null" validate:"required,email"`
	Password   string `gorm:"type:varchar(100);not null" validate:"required,min=8"`
	Address    string `gorm:"type:varchar(100);not null" validate:"required"`
	PrivateKey string `gorm:"type:varchar(100);not null" validate:"required"`
	Mnemonic   string `gorm:"type:varchar(200);not null" validate:"required"`
}

type Token struct {
	Address string `json:"address" gorm:"type:varchar(100);not null" validate:"required"`
	Symbol  string `json:"symbol" gorm:"type:varchar(20);not null" validate:"required,max=20"`
	Name    string `json:"name" gorm:"type:varchar(100);not null" validate:"required,min=2,max=100"`
}

type Account struct {
	PrivateKey string `json:"private_key" gorm:"type:varchar(100);not null" validate:"required"`
	Address    string `json:"address" gorm:"type:varchar(100);not null" validate:"required"`
}

type UserRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type Claims struct {
	Address    string `json:"address"`
	PrivateKey string `json:"private"`
	jwt.StandardClaims
}
