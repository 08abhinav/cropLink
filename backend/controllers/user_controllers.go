package controllers

import (
	"net/http"

	"github.com/08abhinav/cropLink/model"
	"github.com/08abhinav/cropLink/utils"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func RegisterUser(ctx *fiber.Ctx, db *gorm.DB) error {
	var user model.User
	if err := ctx.BodyParser(&user); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	if user.Email == nil || user.Password == nil || user.Name == nil {
		return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing required fields",
		})
	}

	hashedPswd, err := bcrypt.GenerateFromPassword([]byte(*user.Password), bcrypt.DefaultCost)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "hashing error",
			"error":   err.Error(),
		})
	}

	user.Password = strPtr(string(hashedPswd))

	if err := db.Create(&user).Error; err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{
				"message": "Failed to create user",
				"error":   err.Error(),
			})
	}

	return ctx.Status(http.StatusCreated).JSON(fiber.Map{
		"message": "User registered successfully",
		"user": fiber.Map{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}

func SigninUser(ctx *fiber.Ctx, db *gorm.DB) error {
	type LoginRequest struct {
		Email    *string `json:"email:`
		Password *string `json:"password"`
	}

	var loginreq LoginRequest
	var user model.User

	if err := ctx.BodyParser(&loginreq); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	if loginreq.Email == nil || loginreq.Password == nil {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Email and password are required",
		})
	}

	if err := db.Where("email = ?", loginreq.Email).First(&user).Error; err != nil {
		return ctx.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"message": "User not found",
		})
	}

	if user.Password == nil {
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Password not found for user",
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(*loginreq.Password)); err != nil {
		return ctx.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"message": "Invalid credentials",
		})
	}
	
	token, err := utils.GenerateJWT(user.ID, *user.Email, *user.Name)
	if err != nil{
		return ctx.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to generate token",
			"error": err.Error(),
		})
	}

	ctx.Cookie(&fiber.Cookie{
		Name: "token",
		Value: token,
		HTTPOnly: true,
		Secure: false,
		Path: "/",
		MaxAge: 60 * 60 * 24,
	})
	return ctx.JSON(&fiber.Map{
		"message": "Signin successfully",
	})
}

func GetUserInfo(ctx *fiber.Ctx) error{
	email := ctx.Locals("email")
	name := ctx.Locals("name")

	return ctx.JSON(&fiber.Map{
		"email": email, 
		"name": name,
	})
}

func Logout(ctx *fiber.Ctx)error{
	ctx.ClearCookie("token")
	return ctx.JSON(&fiber.Map{
		"message": "logged out successfully",
	})
}

func strPtr(s string) *string {
	return &s
}
