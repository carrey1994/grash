let token = localStorage.getItem('token');
const API_URL = 'http://localhost:8081';

// Login function
async function login() {
    const username = document.getElementById('username').value;
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}`,
        });
        const data = await response.json();
        if (data.token) {
            token = data.token;
            localStorage.setItem('token', token);
            updateLoginSection();
            loadArticles();
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
}

// Update login section based on authentication status
function updateLoginSection() {
    const loginSection = document.getElementById('loginSection');
    if (token) {
        loginSection.innerHTML = `
            <span class="mr-4">Welcome!</span>
            <button onclick="logout()" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        `;
    }
}

// Load articles
async function loadArticles() {
    try {
        const response = await fetch(`${API_URL}/api/articles`);
        const articles = await response.json();
        const articlesContainer = document.getElementById('articles');
        articlesContainer.innerHTML = articles.map(article => `
            <div class="article-card p-6 mb-4">
                <h2 class="text-2xl font-bold mb-2">${article.title}</h2>
                <p class="text-gray-700 mb-4">${article.content}</p>
                <div class="comment-section mt-4">
                    <h3 class="text-lg font-semibold mb-2">Comments</h3>
                    ${article.comments ? article.comments.map(comment => `
                        <div class="comment my-2 text-gray-600">
                            ${comment.content}
                        </div>
                    `).join('') : ''}
                    ${token ? `
                        <div class="mt-4">
                            <input type="text" id="comment-${article.id}" placeholder="Add a comment" 
                                class="w-full p-2 border rounded">
                            <button onclick="addComment(${article.id})" 
                                class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Add Comment
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load articles:', error);
    }
}

// Add comment
async function addComment(articleId) {
    const content = document.getElementById(`comment-${articleId}`).value;
    try {
        const response = await fetch(`${API_URL}/api/articles/${articleId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });
        if (response.ok) {
            loadArticles();
        }
    } catch (error) {
        console.error('Failed to add comment:', error);
    }
}

// Create article
async function createArticle(title, content) {
    try {
        const response = await fetch(`${API_URL}/api/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        });
        if (response.ok) {
            loadArticles();
        }
    } catch (error) {
        console.error('Failed to create article:', error);
    }
}

// Show create article form
function showCreateArticleForm() {
    if (!token) {
        alert('Please login first');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="text-2xl font-bold mb-4">Create New Article</h2>
            <input type="text" id="article-title" placeholder="Title" 
                class="w-full p-2 border rounded mb-4">
            <textarea id="article-content" placeholder="Content" 
                class="w-full p-2 border rounded mb-4" rows="4"></textarea>
            <div class="flex justify-end">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                    class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Cancel</button>
                <button onclick="submitArticle(this)" 
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Submit article
function submitArticle(button) {
    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    if (title && content) {
        createArticle(title, content);
        button.parentElement.parentElement.parentElement.remove();
    }
}

// Logout function
function logout() {
    token = null;
    localStorage.removeItem('token');
    updateLoginSection();
    loadArticles();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateLoginSection();
    loadArticles();
});