package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/08abhinav/cropLink/model"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)


var seededRand = rand.New(rand.NewSource(time.Now().UnixNano()))

func generateShortCode(n int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, n)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func CreateShortUrl(ctx *fiber.Ctx, db *gorm.DB)error{
	type RequestBody struct{
		OriginalUrl string `json:"original_url"`
	}

	var body RequestBody
	if err := ctx.BodyParser(&body); err != nil{
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Invalid request body",
			"error": err.Error(),
		})
	}

	if body.OriginalUrl == ""{
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Original url is required",
		})
	}

	email := ctx.Locals("email")
	if email == nil{
		return ctx.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"message": "unauthorized",
		})
	}

	var user model.User
	if err := db.Where("email = ?", email).First(&user).Error; err != nil{
		return ctx.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"message": "User not found",
		})
	}

	shortCode := generateShortCode(8)
	shortUrl := fmt.Sprintf("http://localhost:8080/u/%s", shortCode)

	newUrl := model.Url{
		OriginalUrl: body.OriginalUrl,
		ShortUrl: shortUrl,
		Clicked: 0,
		UserID: user.ID,
		CreatedAt: time.Now(),
	}

	if err := db.Create(&newUrl).Error; err != nil{
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "could not create short url",
			"error": err.Error(),
		})
	}

	return ctx.JSON(&fiber.Map{
		"message": "short url created successfully",
		"short_url": shortUrl,
		"original": newUrl.OriginalUrl,
		"created_at": newUrl.CreatedAt,
	})
}

func GetUserUrls(ctx *fiber.Ctx, db *gorm.DB)error{
	email := ctx.Locals("email")
	if email == nil{
		return ctx.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"message": "unauthorized",
		})
	}

	var user model.User
	if err := db.Preload("Urls").Where("email = ?", email).First(&user).Error; err != nil{
		return ctx.Status(http.StatusNotFound).JSON(&fiber.Map{
			"message": "user not found",
		})
	}

	return ctx.JSON(&fiber.Map{
		"urls": user.Urls,
	})
}

func RedirectUrl(ctx *fiber.Ctx, db *gorm.DB)error{
	short := ctx.Params("short")
	if short == ""{
		return ctx.Status(http.StatusBadRequest).SendString("Short code missing")
	}

	var url model.Url
	if err := db.Where("short_url LIKE ?", "%"+short).First(&url).Error; err != nil {
		return ctx.Status(http.StatusNotFound).SendString("Short URL not found")
	}

	url.Clicked++
	db.Save(&url)

	return ctx.Redirect("https://"+url.OriginalUrl, http.StatusFound)
}