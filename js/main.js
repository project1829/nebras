// Main Application Engine - محرك التطبيق الرئيسي
document.addEventListener('DOMContentLoaded', () => {
    console.log('نبراس العلم - تم تحميل الصفحة بنجاح');
    
    // Initialize any interactive elements here
    initializeApp();
});

function initializeApp() {
    // Add any initialization logic here
    console.log('تم تهيئة التطبيق');
}

// Utility functions
const utils = {
    isAuthenticated: () => {
        // Check if user is authenticated
        return localStorage.getItem('authToken') !== null;
    },
    
    redirectToLogin: () => {
        window.location.href = 'login.html';
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}

