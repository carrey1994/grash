package handlers

import (
	"net/http"

	"grash/database"
	"grash/models"

	"github.com/gin-gonic/gin"
)

// CreateArticle handles the creation of a new article
func CreateArticle(c *gin.Context) {
	var article models.Article
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&article)
	c.JSON(http.StatusCreated, article)
}

// GetArticles returns all articles
func GetArticles(c *gin.Context) {
	var articles []models.Article
	database.DB.Find(&articles)
	c.JSON(http.StatusOK, articles)
}

// GetArticle returns a single article with its comments
func GetArticle(c *gin.Context) {
	id := c.Param("id")
	var article models.Article

	if err := database.DB.Preload("Comments").First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	c.JSON(http.StatusOK, article)
}
