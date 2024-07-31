package db

import (
	"crypto-wallet/model"

	"github.com/gofiber/fiber/v2/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB() *gorm.DB {
	dsn := "host=localhost port=5432 user=root password=anangs123 sslmode=disable dbname=go_apps"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	if err := db.AutoMigrate(&model.Account{}, &model.Token{}, &model.User{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	return db
}
