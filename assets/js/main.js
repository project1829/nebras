// frontend/assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // محاكاة تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // منع الإرسال الفعلي للنموذج
            console.log('Login form submitted, redirecting to home.html');
            window.location.href = 'home.html'; // الانتقال إلى الصفحة الرئيسية
        });
    }

    // محاكاة إنشاء حساب جديد
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // منع الإرسال الفعلي للنموذج
            console.log('Register form submitted, redirecting to home.html');
            window.location.href = 'home.html'; // الانتقال إلى الصفحة الرئيسية بعد التسجيل
        });
    }
    
    // محاكاة تسجيل الخروج
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Logout button clicked, redirecting to index.html');
            window.location.href = 'index.html'; // العودة للصفحة الرئيسية للزوار
        });
    }

    // --- أكواد إضافية لتحسين التفاعل ---

    // تفعيل قائمة الملف الشخصي في صفحة home.html
    const profileMenuButton = document.getElementById('profile-menu-button');
    const profileMenu = document.getElementById('profile-menu');
    if (profileMenuButton && profileMenu) {
        profileMenuButton.addEventListener('click', () => {
            profileMenu.classList.toggle('hidden');
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (event) => {
            if (!profileMenuButton.contains(event.target) && !profileMenu.contains(event.target)) {
                profileMenu.classList.add('hidden');
            }
        });
    }
    
    // تفعيل التبويبات في صفحة profile.html
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab-target');

                tabButtons.forEach(btn => {
                    btn.classList.remove('active', 'border-nabras-gold', 'text-nabras-gold');
                    btn.classList.add('border-transparent', 'text-nabras-gray');
                });

                this.classList.add('active', 'border-nabras-gold', 'text-nabras-gold');
                this.classList.remove('border-transparent', 'text-nabras-gray');

                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });

                if (document.querySelector(targetTab)) {
                    document.querySelector(targetTab).classList.remove('hidden');
                }
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const profileMenuButton = document.getElementById('profile-menu-button');
    const profileMenu = document.getElementById('profile-menu');
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    const toggleMenu = (menuElement) => {
        if (menuElement) {
            menuElement.classList.toggle('hidden');
        }
    };

    const toggleHamburgerIcon = () => {
        if (menuOpenIcon && menuCloseIcon) {
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        }
    }

    if (profileMenuButton) {
        profileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu(profileMenu);
        });
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu(mobileMenu);
            toggleHamburgerIcon();
        });
    }

    document.addEventListener('click', (event) => {
        if (profileMenu && !profileMenu.classList.contains('hidden') && !profileMenu.contains(event.target) && !profileMenuButton.contains(event.target)) {
            toggleMenu(profileMenu);
        }

        if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            toggleMenu(mobileMenu);
            toggleHamburgerIcon();
        }
    });
});