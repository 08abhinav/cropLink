package controllers

import "github.com/gofiber/fiber/v2"

func HomePage(ctx *fiber.Ctx)error{
	return ctx.JSON(&fiber.Map{
		"message": "Welcome to the CropLink"})
}

func RegisterUser(ctx *fiber.Ctx)error{
	return nil
}

func SigninUser(ctx *fiber.Ctx) error{
	return nil
}