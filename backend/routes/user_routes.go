package routes

import (
	"github.com/08abhinav/cropLink/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App){
	api := app.Group("/api")
	app.Get("/", controllers.HomePage)
	api.Post("/register", controllers.RegisterUser)
	api.Post("/signin", controllers.SigninUser)
}