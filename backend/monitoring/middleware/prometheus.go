package middleware

import (
	"time"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/08abhinav/cropLink/monitoring/metrics"
)

func PrometheusMiddleware() fiber.Handler{
	return func(c *fiber.Ctx) error{
		start := time.Now()
		err := c.Next()

		duration := time.Since(start).Seconds()
		route := c.Route().Path
		method := c.Method()
		status := c.Response().StatusCode()

		metrics.HttpRequestsTotal.WithLabelValues(
			route,
			method,
			strconv.Itoa(status),
		).Inc()

		metrics.HttpRequestDuration.WithLabelValues(
			route,
			method,	
		).Observe(duration)

		return err
	}
}
