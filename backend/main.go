package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/08abhinav/cropLink/model"
	"github.com/08abhinav/cropLink/routes"
	"github.com/08abhinav/cropLink/shared"
	"github.com/08abhinav/cropLink/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)


func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173, http://localhost:3000, http://localhost",
		AllowCredentials: true,
	}))

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("can't load .env file:", err)
	}

	os.Getenv("JWT_SECRETKEY")
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_DBNAME"),
	}

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("database connection failed:", err)
	}

	err = model.MigrateModels(db)
	if err != nil {
		log.Fatal("migration error:", err)
	}

	repo := &shared.Repos{
		DB: db,
	}

	app.Get("/", func(c *fiber.Ctx) error{
		return c.SendString("Hello from backend")
	})
	routes.UrlRoutes(app, repo)
	log.Fatal(app.Listen(":8080"))
}
