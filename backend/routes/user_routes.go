package routes

import (
	"github.com/08abhinav/cropLink/controllers"
	"github.com/gofiber/fiber/v2"
	"github.com/08abhinav/cropLink/shared"
)

func UserRoutes(app *fiber.App, repo *shared.Repos) {
	api := app.Group("/api/user")
	app.Get("/", controllers.HomePage)

	api.Post("/register", func(c *fiber.Ctx) error {
		return controllers.RegisterUser(c, repo.DB)
	})

	api.Post("/signin", func(c *fiber.Ctx) error {
		return controllers.SigninUser(c, repo.DB)
	})
}
