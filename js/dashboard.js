import books from './books_data.js';

document.addEventListener('DOMContentLoaded', () => {
    const booksGrid = document.getElementById('books-grid');
    const filterMajor = document.getElementById('filter-major');
    const searchInput = document.getElementById('search-input');
    const addBookButton = document.getElementById('add-book-button');
    const modal = document.getElementById('add-book-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const addBookForm = document.getElementById('add-book-form');
    const majorSelectInForm = addBookForm.querySelector('select');
    
    let allMajors = [];

    function populateMajors() {
        allMajors = [...new Set(books.map(book => book.major))];
        allMajors.sort();
        
        filterMajor.innerHTML = '<option value="all">كل التخصصات</option>';
        majorSelectInForm.innerHTML = '<option value="">اختر التخصص</option>';

        allMajors.forEach(major => {
            const option = `<option value="${major}">${major}</option>`;
            filterMajor.innerHTML += option;
            majorSelectInForm.innerHTML += option;
        });
    }

    function renderBooks(filteredBooks = books) {
        booksGrid.innerHTML = '';
        if (filteredBooks.length === 0) {
            booksGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">لا توجد كتب تطابق بحثك.</p>`;
            return;
        }

        filteredBooks.forEach(book => {
            const card = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <img src="${book.imageUrl}" alt="${book.title}" class="w-full h-48 object-cover">
                    <div class="p-4 flex flex-col flex-grow">
                        <span class="text-sm text-nibras-gold font-semibold">${book.major}</span>
                        <h3 class="text-lg font-bold text-nibras-blue mt-1 flex-grow">${book.title}</h3>
                        <p class="text-sm text-gray-600 mt-1">بواسطة ${book.author}</p>
                         <div class="text-xs text-gray-500 mt-2">أضيف بواسطة: 
                            <a href="profile.html?userId=${book.user.id}" class="text-nibras-blue hover:underline font-semibold">${book.user.name}</a>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-xl font-black text-nibras-blue">${book.price} <span class="text-sm">ر.س</span></span>
                            <span class="text-sm font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded-full">${book.condition}</span>
                        </div>
                    </div>
                </div>
            `;
            booksGrid.innerHTML += card;
        });
        lucide.createIcons();
    }

    function filterAndSearch() {
        const majorValue = filterMajor.value;
        const searchValue = searchInput.value.toLowerCase();

        let filtered = books;

        if (majorValue !== 'all') {
            filtered = filtered.filter(book => book.major === majorValue);
        }

        if (searchValue) {
            filtered = filtered.filter(book => 
                book.title.toLowerCase().includes(searchValue) ||
                book.author.toLowerCase().includes(searchValue) ||
                book.major.toLowerCase().includes(searchValue)
            );
        }
        renderBooks(filtered);
    }

    filterMajor.addEventListener('change', filterAndSearch);
    searchInput.addEventListener('input', filterAndSearch);

    addBookButton.addEventListener('click', () => modal.classList.remove('hidden'));
    closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));
    modal.querySelector('.modal-backdrop').addEventListener('click', () => modal.classList.add('hidden'));
    
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تمت إضافة الكتاب بنجاح! (محاكاة)');
        modal.classList.add('hidden');
        addBookForm.reset();
    });

    populateMajors();
    renderBooks();
});
