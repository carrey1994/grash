import { useState, useEffect } from 'react'
import { Article, Comment } from '../types'
import { articleApi, commentApi } from '../services/api'
import '../styles/ArticleDetail.css'

interface ArticleDetailProps {
  articleId: number;
  onClose: () => void;
}

const ArticleDetail = ({ articleId, onClose }: ArticleDetailProps) => {
  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({
    content: '',
    author: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchArticleAndComments()
  }, [articleId])

  const fetchArticleAndComments = async () => {
    try {
      const articleResponse = await articleApi.getArticle(articleId)
      setArticle(articleResponse.data)
      
      const commentsResponse = await commentApi.getComments(articleId)
      setComments(commentsResponse.data)
    } catch (err) {
      setError('Failed to fetch article details')
      console.error(err)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await commentApi.createComment(articleId, {
        ...newComment,
        article_id: articleId
      })
      setNewComment({ content: '', author: '' })
      fetchArticleAndComments() // Refresh comments
    } catch (err) {
      setError('Failed to post comment')
      console.error(err)
    }
  }

  if (!article) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="article-detail-overlay">
      <div className="article-detail">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <article className="article-content">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="author">By {article.author}</span>
            <span className="date">
              {new Date(article.created_at!).toLocaleDateString()}
            </span>
          </div>
          <div className="content">
            {article.content}
          </div>
        </article>

        <section className="comments-section">
          <h2>Comments</h2>
          
          {error && <div className="error-message">{error}</div>}

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="author">Name</label>
              <input
                type="text"
                id="author"
                value={newComment.author}
                onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Comment</label>
              <textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={3}
              />
            </div>
            <button type="submit" className="submit-button">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">
                    {new Date(comment.created_at!).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ArticleDetail