package routes

import (
	"github.com/08abhinav/cropLink/controllers"
	"github.com/gofiber/fiber/v2"
)

func UrlRoutes(app *fiber.App)error{
	api := app.Group("/api")

	api.Post("/crateUrl", controllers.CreateShortUrl)
	return nil
}