import axios from 'axios';
import { Article, Comment, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8081/api'; // Adjust this to match your Go backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleApi = {
  // Get all articles
  getArticles: async (): Promise<Article[]> => {
    const response = await api.get('/articles');
    return response.data;  // API directly returns array of articles
  },

  // Get single article
  getArticle: async (id: number): Promise<Article> => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  // Create new article
  createArticle: async (article: Omit<Article, 'id' | 'created_at'>): Promise<Article> => {
    const response = await api.post('/articles', article);
    return response.data;
  },

  // Update article
  updateArticle: async (id: number, article: Partial<Article>): Promise<Article> => {
    const response = await api.put(`/articles/${id}`, article);
    return response.data;
  },

  // Delete article
  deleteArticle: async (id: number): Promise<void> => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

export const commentApi = {
  // Get comments for an article
  getComments: async (articleId: number): Promise<ApiResponse<Comment[]>> => {
    const response = await api.get(`/articles/${articleId}/comments`);
    return response.data;
  },

  // Create new comment
  createComment: async (articleId: number, comment: Omit<Comment, 'id' | 'created_at'>): Promise<ApiResponse<Comment>> => {
    const response = await api.post(`/articles/${articleId}/comments`, comment);
    return response.data;
  },

  // Delete comment
  deleteComment: async (articleId: number, commentId: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/articles/${articleId}/comments/${commentId}`);
    return response.data;
  },
};

export default api;
