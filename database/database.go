package database

import (
	"log"
	"path/filepath"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"grash/models"
)

var DB *gorm.DB

func InitDB() {
	var err error
	// Use data directory for SQLite database in Docker environment
	dbPath := filepath.Join("data", "reddit.db")
	DB, err = gorm.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Set connection pool settings
	DB.DB().SetMaxIdleConns(10)
	DB.DB().SetMaxOpenConns(100)

	// Enable logging in development
	DB.LogMode(true)

	// Auto migrate the schemas
	DB.AutoMigrate(&models.Article{}, &models.Comment{})

	// Check if database is empty
	var count int
	DB.Model(&models.Article{}).Count(&count)
	if count == 0 {
		// Seed data if database is empty
		SeedData()
		log.Println("Database seeded with sample data")
	}
}
