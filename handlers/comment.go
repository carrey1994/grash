package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"grash/database"
	"grash/models"
)

// CreateComment handles the creation of a new comment for an article
func CreateComment(c *gin.Context) {
	articleID := c.Param("id")
	var comment models.Comment
	
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if article exists
	var article models.Article
	if err := database.DB.First(&article, articleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	comment.ArticleID = article.ID
	database.DB.Create(&comment)
	c.JSON(http.StatusCreated, comment)
}

// GetComments returns all comments for an article
func GetComments(c *gin.Context) {
	articleID := c.Param("id")
	var comments []models.Comment
	
	database.DB.Where("article_id = ?", articleID).Find(&comments)
	c.JSON(http.StatusOK, comments)
}