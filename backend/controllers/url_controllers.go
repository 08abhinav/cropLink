package controllers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/08abhinav/cropLink/model"
	"github.com/08abhinav/cropLink/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreateShortUrl(ctx *fiber.Ctx, db *gorm.DB) error { 
	type RequestBody struct {
		OriginalUrl string `json:"original_url"` 
	} 

	var body RequestBody 
	if err := ctx.BodyParser(&body); err != nil {

	return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{ 
		"message": "Invalid request body", 
		"error": err.Error(), }) 
	} 

	if body.OriginalUrl == "" { 

	return ctx.Status(http.StatusBadRequest).JSON(fiber.Map{ 
		"message": "Original url is required", }) 
	} 

	userId, ok := ctx.Locals("user_id").(string) 
	if !ok || userId == "" {
		return ctx.Status(http.StatusUnauthorized).JSON(fiber.Map{ 
			"message": "unauthorized", }) 
	} 
	shortCode := utils.GenerateShortCode(6) 
	baseUrl := os.Getenv("BASE_URL")
	shortUrl := fmt.Sprintf("%s/%s", baseUrl, shortCode) 

	newUrl := model.Url{ 
		OriginalUrl: body.OriginalUrl, 
		ShortUrl: shortCode, 
		Clicked: 0, 
		UserID: userId, 
	} 

	if err := db.Create(&newUrl).Error; err != nil {	
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{ 
			"message": "could not create short url", 
			"error": err.Error(), 
		}) 
	} 

	return ctx.JSON(fiber.Map{ 
		"message": "short url created successfully", 
		"short_url": shortUrl, 
		"original": newUrl.OriginalUrl, 
		"created_at": newUrl.CreatedAt, 
	}) 
}

func GetUserUrls(ctx *fiber.Ctx, db *gorm.DB)error{
	ID := ctx.Locals("user_id").(string)
	if ID == ""{
		return ctx.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"message": "unauthorized",
		})
	}

	var urls[] model.Url
	if err := db.Where("user_id = ?", ID).Find(&urls).Error; err != nil{
		return ctx.Status(http.StatusNotFound).JSON(&fiber.Map{
			"message": "user not found",
		})
	}

	return ctx.JSON(&fiber.Map{
		"urls": urls,
	})
}

func RedirectUrl(ctx *fiber.Ctx, db *gorm.DB) error {
    short := ctx.Params("short")
    if short == "" {
        return ctx.Status(fiber.StatusBadRequest).SendString("Short code missing")
    }

    var url model.Url
    if err := db.Where("short_url = ?", short).First(&url).Error; err != nil {
        return ctx.Status(fiber.StatusNotFound).SendString("Short URL not found")
    }

    url.Clicked += 1
    db.Save(&url)

	return ctx.Redirect(url.OriginalUrl, fiber.StatusFound)
}

type DashboardStats struct {
	TotalLinks     int64  `json:"total_links"`
	TotalClicks    int64  `json:"total_clicks"`
	LastCreatedURL string `json:"last_created_url,omitempty"`
}

func GetUserStat(ctx *fiber.Ctx, db *gorm.DB) error {
	// Safely extract Clerk user_id
	userIdVal := ctx.Locals("user_id")
	userId, ok := userIdVal.(string)
	if !ok || userId == "" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User ID missing or invalid",
		})
	}
 
	var totalLinks int64
	if err := db.Model(&model.Url{}).
		Where("user_id = ?", userId).
		Count(&totalLinks).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to count links",
			"error":   err.Error(),
		})
	}

	var totalClicksResult struct {
		Sum uint64
	}
	if err := db.Model(&model.Url{}).
		Select("COALESCE(SUM(clicked),0) as sum").
		Where("user_id = ?", userId).
		Scan(&totalClicksResult).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to sum clicks",
			"error":   err.Error(),
		})
	}

	var lastURL model.Url
	if err := db.Where("user_id = ?", userId).
		Order("created_at DESC").
		Limit(1).
		First(&lastURL).Error; err != nil && err != gorm.ErrRecordNotFound {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to fetch last URL",
			"error":   err.Error(),
		})
	}

	res := DashboardStats{
		TotalLinks:    totalLinks,
		TotalClicks:   int64(totalClicksResult.Sum),
		LastCreatedURL: lastURL.ShortUrl,
	}

	return ctx.JSON(res)
}
