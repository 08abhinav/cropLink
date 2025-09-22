package model

import (
	"gorm.io/gorm"
	"time"
)

type Url struct {
	ID          uint      `gorm:"primaryKey; autoIncrement" json:"id"`
	OriginalUrl string    `json:"original_url"`
	ShortUrl    string    `json:"short_url" gorm:"uniqueIndex"`
	IsCustom    bool      `json:"is_custom" gorm:"default:false"`
	Clicked     uint      `json:"clicked"`
	ExpiresAt   time.Time `json:"expires_at" gorm:"type:timestamp;default:null"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UserID      string    `json:"user_id"`
}

func MigrateModels(db *gorm.DB) error {
	err := db.AutoMigrate(&Url{})
	return err
}
