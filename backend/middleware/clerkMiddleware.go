package middleware

import (
	"log"
	"os"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/gofiber/fiber/v2"
)

func ClerkAuth() fiber.Handler {
    client, err := clerk.NewClient(os.Getenv("CLERK_SECRET_KEY"))
    if err != nil {
        log.Fatalf("Failed to init Clerk: %v", err)
    }

    return func(c *fiber.Ctx) error {
        token := c.Cookies("__session")
        if token == "" {
            authHeader := c.Get("Authorization")
            if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
                token = authHeader[7:]
            }
        }
        if token == "" {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Missing Clerk token",
            })
        }

        claims, err := client.VerifyToken(token)
        if err != nil {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Invalid or expired token",
                "error":   err.Error(),
            })
        }

        c.Locals("user_id", claims.Subject)
        return c.Next()
    }
}
