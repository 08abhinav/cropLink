package routes

import (
	"github.com/08abhinav/cropLink/controllers"
	"github.com/08abhinav/cropLink/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/08abhinav/cropLink/shared"
)

func UrlRoutes(app *fiber.App, repo *shared.Repos) {
	api := app.Group("url", middleware.ClerkAuth())

	app.Get("/:short", func(c *fiber.Ctx) error {
		return controllers.RedirectUrl(c, repo.DB)
	})

	api.Post("/createUrl", func(c *fiber.Ctx) error {
		return controllers.CreateShortUrl(c, repo.DB)
	})

	api.Get("/my-urls", func(c *fiber.Ctx) error {
		return controllers.GetUserUrls(c, repo.DB)
	})

	api.Get("/getStats", func(c *fiber.Ctx) error{
		return controllers.GetUserStat(c, repo.DB)
	})
}
