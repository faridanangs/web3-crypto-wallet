package handler

import (
	"crypto-wallet/db"
	"crypto-wallet/model"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func CreateAcount(c *fiber.Ctx) error {
	db := db.ConnectDB()
	accountModel := model.Account{}
	c.BodyParser(&accountModel)
	validate := validator.New()

	if err := validate.Struct(&accountModel); err != nil {
		return c.Status(400).SendString("Invalid Request")
	}

	account := model.Account{
		Address:    accountModel.Address,
		PrivateKey: accountModel.PrivateKey,
	}

	if err := db.Debug().Create(&account).Error; err != nil {
		return c.Status(500).SendString("Error creating account: " + err.Error())
	}

	return c.Status(200).JSON(fiber.Map{
		"code":    200,
		"status":  "OK",
		"message": "created account successfully",
	})
}

func GetAllAccount(c *fiber.Ctx) error {
	db := db.ConnectDB()

	accountModels := []model.Account{}

	if err := db.Debug().Model(&model.Account{}).Find(&accountModels).Error; err != nil {
		return c.Status(500).SendString("Error at getting all account: " + err.Error())
	}

	return c.Status(200).JSON(fiber.Map{
		"code":   200,
		"status": "OK",
		"data":   accountModels,
	})
}
