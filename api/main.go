package main

import (
	"crypto-wallet/handler"

	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST",
	}))

	api := app.Group("/api/v1")

	api.Post("/user/signup", handler.SignUp)
	api.Post("/user/login", handler.LogIn)

	api.Post("/tokens/createtoken", jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte("Lorem Ipsum")},
	}), handler.CreateToken)

	api.Get("/tokens/alltoken", handler.GetAllToken)

	api.Post("/account/createaccount", jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte("Lorem Ipsum")},
	}), handler.CreateAcount)
	api.Get("/account/allaccount", handler.GetAllAccount)

	err := app.Listen(":3301")
	if err != nil {
		panic(err)
	}
}
