package main

import (
	"log"
	"os"
	"net/http"

	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/08abhinav/cropLink/model"
	"github.com/08abhinav/cropLink/routes"
	"github.com/08abhinav/cropLink/shared"
	"github.com/08abhinav/cropLink/storage"
	"github.com/08abhinav/cropLink/monitoring/metrics"
	"github.com/08abhinav/cropLink/monitoring/monitormiddleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/adaptor/v2"
	"github.com/joho/godotenv"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)


func main() {
	app := fiber.New()
	
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173, http://localhost:3000, http://localhost",
		AllowCredentials: true,
	}))

	metrics.InitMetrics()
	app.Use(monitormiddleware.PrometheusMiddleware())

	if err := godotenv.Load(".env"); err != nil {
		log.Println(".env not found, using container environment variables")
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
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Croplink Backend running",
		})
	})
	
	app.Get("/metrics", adaptor.HTTPHandler(promhttp.Handler()))

	routes.UrlRoutes(app, repo)	
	log.Fatal(app.Listen(":8080"))
}
