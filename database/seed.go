package database

import (
	"grash/models"
	"time"
)

func SeedData() {
	// Create sample articles
	articles := []models.Article{
		{
			Title:     "Getting Started with Go",
			Content:   "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.",
			CreatedAt: time.Now(),
		},
		{
			Title:     "Why I Love Docker",
			Content:   "Docker containers wrap up software and its dependencies into a standardized unit for software development.",
			CreatedAt: time.Now(),
		},
		{
			Title:     "Introduction to Kubernetes",
			Content:   "Kubernetes is an open-source container orchestration system for automating software deployment, scaling, and management.",
			CreatedAt: time.Now(),
		},
	}

	// Insert articles
	for _, article := range articles {
		DB.Create(&article)

		// Create sample comments for each article
		comments := []models.Comment{
			{
				Content:   "Great article! Very informative.",
				ArticleID: article.ID,
				CreatedAt: time.Now(),
			},
			{
				Content:   "Thanks for sharing this knowledge.",
				ArticleID: article.ID,
				CreatedAt: time.Now(),
			},
		}

		// Insert comments
		for _, comment := range comments {
			DB.Create(&comment)
		}
	}
}