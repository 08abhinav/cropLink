package model

import (
	"time"
	"gorm.io/gorm"
)

type User struct {
	ID       uint    `gorm:"primaryKey; autoIncrement" json:"id"`
	Name     *string `json:"name"`
	Email    *string `gorm:"unique" json:"email"`
	Password *string `json:"password"`

	Urls []Url `gorm:"foreignKey:UserID" json:"urls"`
}

type Url struct {
	ID          uint      `gorm:"primaryKey; autoIncrement" json:"id"`
	OriginalUrl string    `json:"original_url"`
	ShortUrl    string    `json:"short_url"`
	CreatedAt   time.Time `json:"createdat"`

	UserID uint `json:user_id`
	User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"-"`
}

func MigrateModels(db *gorm.DB) error{
	err := db.AutoMigrate(&User{}, &Url{})
	return err
}