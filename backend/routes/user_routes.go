package routes

import (
	"github.com/08abhinav/cropLink/controllers"
	"github.com/08abhinav/cropLink/middleware"
	"github.com/08abhinav/cropLink/shared"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App, repo *shared.Repos) {
	api := app.Group("/api/user")

	api.Post("/register", func(c *fiber.Ctx) error {
		return controllers.RegisterUser(c, repo.DB)
	})

	api.Post("/signin", func(c *fiber.Ctx) error {
		return controllers.SigninUser(c, repo.DB)
	})

	api.Get("/me", middleware.JWTMiddleware(), func(c *fiber.Ctx)error{
		return controllers.GetUserInfo(c) 
	})

	api.Get("/logout", middleware.JWTMiddleware(), func(c *fiber.Ctx)error{
		return controllers.Logout(c)
	})
}
