// طبقة الاتصال مع الواجهة الخلفية - API Layer
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('auth_token');
}

// Helper function to get auth headers
function getAuthHeaders() {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
}

// Helper function for API requests
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: getAuthHeaders(),
        ...options
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'حدث خطأ في الطلب');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication APIs
export const authAPI = {
    async login(email, password) {
        return apiRequest('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    async register(name, email, password, password_confirmation) {
        return apiRequest('/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, password_confirmation })
        });
    },

    async logout() {
        return apiRequest('/logout', {
            method: 'POST'
        });
    },

    async getUser() {
        return apiRequest('/user');
    },

    async forgotPassword(email) {
        return apiRequest('/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    },

    async resetPassword(email, token, password, password_confirmation) {
        return apiRequest('/reset-password', {
            method: 'POST',
            body: JSON.stringify({ email, token, password, password_confirmation })
        });
    }
};

// Books APIs
export const booksAPI = {
    async getBooks() {
        return apiRequest('/books');
    },

    async getBook(id) {
        return apiRequest(`/books/${id}`);
    },

    async createBook(bookData) {
        const formData = new FormData();
        Object.keys(bookData).forEach(key => {
            if (key === 'images' && bookData[key]) {
                Array.from(bookData[key]).forEach(file => {
                    formData.append('images[]', file);
                });
            } else {
                formData.append(key, bookData[key]);
            }
        });

        return apiRequest('/books', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: formData
        });
    },

    async updateBook(id, bookData) {
        return apiRequest(`/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify(bookData)
        });
    },

    async deleteBook(id) {
        return apiRequest(`/books/${id}`, {
            method: 'DELETE'
        });
    }
};

// Conversations APIs
export const conversationsAPI = {
    async getConversations() {
        return apiRequest('/conversations');
    },

    async getConversation(id) {
        return apiRequest(`/conversations/${id}`);
    },

    async createConversation(bookId) {
        return apiRequest('/conversations', {
            method: 'POST',
            body: JSON.stringify({ book_id: bookId })
        });
    },

    async getMessages(conversationId) {
        return apiRequest(`/conversations/${conversationId}/messages`);
    },

    async sendMessage(conversationId, content) {
        return apiRequest(`/conversations/${conversationId}/messages`, {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    }
};

// Transactions APIs
export const transactionsAPI = {
    async getTransactions() {
        return apiRequest('/transactions');
    },

    async requestBook(bookId) {
        return apiRequest('/transactions/request', {
            method: 'POST',
            body: JSON.stringify({ book_id: bookId })
        });
    },

    async acceptRequest(transactionId) {
        return apiRequest('/transactions/accept', {
            method: 'POST',
            body: JSON.stringify({ transaction_id: transactionId })
        });
    },

    async rejectRequest(transactionId) {
        return apiRequest('/transactions/reject', {
            method: 'POST',
            body: JSON.stringify({ transaction_id: transactionId })
        });
    },

    async confirmTransaction(transactionId) {
        return apiRequest('/transactions/confirm', {
            method: 'POST',
            body: JSON.stringify({ transaction_id: transactionId })
        });
    }
};

// Utility functions
export const utils = {
    isAuthenticated() {
        return !!getAuthToken();
    },

    saveAuthData(token, user) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
    },

    getUserData() {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    },

    clearAuthData() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    },

    redirectToLogin() {
        window.location.href = 'login.html';
    },

    redirectToHome() {
        window.location.href = 'home.html';
    }
};

