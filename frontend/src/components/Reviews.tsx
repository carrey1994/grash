import { useState, useEffect } from 'react'
import { Article } from '../types'
import { articleApi } from '../services/api'
import ArticleDetail from './ArticleDetail'
import '../styles/Reviews.css'

const Reviews = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState('')
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await articleApi.getArticles()
      setArticles(response)
    } catch (err) {
      setError('Failed to fetch reviews')
      console.error(err)
    }
  }

  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="reviews-header">
          <h2>Our Reviews</h2>
          <p>Discover what others are saying about their experiences and insights. Real stories from real users.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="reviews-grid">
          {articles && articles.map((article) => (
            <article key={article.id} className="review-card">
              <div className="review-content">
                <h3 className="review-title">{article.title}</h3>
                <p className="review-preview">
                  {article.content.length > 150 
                    ? `${article.content.substring(0, 150)}...` 
                    : article.content}
                </p>
              </div>
            </article>
          ))}
        </div>

        {selectedArticleId && (
          <ArticleDetail 
            articleId={selectedArticleId}
            onClose={() => setSelectedArticleId(null)}
          />
        )}
      </div>
    </section>
  )
}

export default Reviews
