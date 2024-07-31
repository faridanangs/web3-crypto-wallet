package handler

import (
	"crypto-wallet/db"
	"crypto-wallet/model"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *fiber.Ctx) error {
	db := db.ConnectDB()
	validate := validator.New()
	userModel := model.User{}
	c.BodyParser(&userModel)

	if err := validate.Struct(&userModel); err != nil {
		return c.Status(400).SendString("Invalid Request")
	}

	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(userModel.Password), 14)

	user := model.User{
		Name:       userModel.Name,
		Email:      userModel.Email,
		Password:   string(passwordHash),
		Address:    userModel.Address,
		PrivateKey: userModel.PrivateKey,
		Mnemonic:   userModel.Mnemonic,
	}

	if err := db.Debug().Create(&user).Error; err != nil {
		return c.Status(500).SendString("Error creating user: " + err.Error())
	}

	return c.Status(200).SendString("User created successfully")
}

func LogIn(c *fiber.Ctx) error {
	db := db.ConnectDB()
	validate := validator.New()
	userModel := model.User{}
	userRequest := model.UserRequest{}

	c.BodyParser(&userRequest)

	if err := validate.Struct(&userRequest); err != nil {
		return c.Status(400).SendString("Invalid Request")
	}

	if err := db.Debug().Model(&userModel).Where("email = ?", userRequest.Email).Take(&userModel).Error; err != nil {
		return c.Status(404).SendString("User not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userModel.Password), []byte(userRequest.Password)); err != nil {
		return c.Status(401).SendString("Invalid Credentials")
	}

	claims := model.Claims{
		Address:    userModel.Address,
		PrivateKey: userModel.PrivateKey,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(30 * 24 * time.Hour).Unix(),
		},
	}

	tokenClaim := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	jwtToken, err := tokenClaim.SignedString([]byte("Lorem Ipsum"))
	if err != nil {
		return c.Status(500).SendString("Error creating token: " + err.Error())
	}

	return c.Status(200).JSON(fiber.Map{
		"code":   200,
		"status": "OK",
		"data": map[string]interface{}{
			"address":     userModel.Address,
			"private_key": userModel.PrivateKey,
			"mnemonic":    userModel.Mnemonic,
		},
		"token": jwtToken,
	})
}
