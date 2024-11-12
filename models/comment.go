package models

import (
	"time"
)

type Comment struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Content   string    `json:"content" binding:"required"`
	ArticleID uint      `json:"article_id"`
	CreatedAt time.Time `json:"created_at"`
}