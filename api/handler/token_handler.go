package handler

import (
	"crypto-wallet/db"
	"crypto-wallet/model"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func CreateToken(c *fiber.Ctx) error {
	db := db.ConnectDB()
	tokenModel := model.Token{}
	c.BodyParser(&tokenModel)
	validate := validator.New()

	if err := validate.Struct(&tokenModel); err != nil {
		return c.Status(400).SendString("Invalid Request")
	}

	token := model.Token{
		Address: tokenModel.Address,
		Name:    tokenModel.Name,
		Symbol:  tokenModel.Symbol,
	}

	if err := db.Debug().Create(&token).Error; err != nil {
		return c.Status(500).SendString("Error creating token: " + err.Error())
	}

	return c.Status(200).SendString("Token created successfully")
}

func GetAllToken(c *fiber.Ctx) error {
	db := db.ConnectDB()

	tokenModels := []model.Token{}

	if err := db.Debug().Model(&model.Token{}).Find(&tokenModels).Error; err != nil {
		return c.Status(500).SendString("Error at getting all token: " + err.Error())
	}

	return c.Status(200).JSON(fiber.Map{
		"code":   200,
		"status": "OK",
		"data":   tokenModels,
	})
}
