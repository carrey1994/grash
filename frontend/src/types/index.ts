export interface Article {
  id?: number;
  title: string;
  content: string;
  // author: string;
  created_at?: string;
}

export interface Comment {
  id?: number;
  article_id: number;
  author: string;
  content: string;
  created_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}