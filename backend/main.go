package backend

import (
	"log"
	"os"

	"github.com/08abhinav/cropLink/model"
	"github.com/08abhinav/cropLink/routes"
	"github.com/08abhinav/cropLink/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("can't load .evn", err)
	}

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
		log.Fatal("config error", err)
	}

	err = model.MigrateModels(db)
	if err != nil {
		log.Fatal("migration error", err)
	}

	routes.UserRoutes(app)
	routes.UrlRoutes(app) 

	app.Listen(":8080")
}
