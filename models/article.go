package models

import (
	"time"
)

type Article struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title" binding:"required"`
	Content   string    `json:"content" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
	Comments  []Comment `json:"comments" gorm:"foreignKey:ArticleID"`
}