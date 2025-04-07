// admin.js
document.addEventListener('DOMContentLoaded', () => {
    // Initial data
    let posts = [
        { id: 1, title: "The Latest Blog Post", category: "Technology", date: "2025-04-03", readTime: 5 },
        { id: 2, title: "How to Create an Effective Daily Routine", category: "Lifestyle", date: "2025-04-01", readTime: 4 }
    ];
    let categories = ["Technology", "Lifestyle", "Food", "Travel"];

    // DOM Elements
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
    const sections = document.querySelectorAll('.content-section');
    const addPostBtn = document.getElementById('add-post-btn');
    const addCategoryBtn = document.getElementById('add-category-btn');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.getElementById('close-modal');
    const postForm = document.getElementById('post-form');
    const postsList = document.getElementById('posts-list');
    const categoriesList = document.getElementById('categories-list');
    const categorySelect = document.getElementById('post-category');

    // Navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const sectionId = link.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Dashboard Stats
    function updateDashboard() {
        document.getElementById('total-posts').textContent = posts.length;
        document.getElementById('total-categories').textContent = categories.length;
        document.getElementById('last-update').textContent = new Date().toLocaleDateString();
    }

    // Posts Management
    function renderPosts() {
        postsList.innerHTML = '';
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <span>${post.title} - ${post.category} (${post.date})</span>
                <div class="post-actions">
                    <button class="btn edit-post" data-id="${post.id}">Edit</button>
                    <button class="btn btn-secondary delete-post" data-id="${post.id}">Delete</button>
                </div>
            `;
            postsList.appendChild(postItem);
        });

        // Add event listeners for edit/delete
        document.querySelectorAll('.edit-post').forEach(btn => {
            btn.addEventListener('click', () => editPost(btn.dataset.id));
        });
        document.querySelectorAll('.delete-post').forEach(btn => {
            btn.addEventListener('click', () => deletePost(btn.dataset.id));
        });
    }

    function renderCategories() {
        categoriesList.innerHTML = '';
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        
        categories.forEach(category => {
            const catItem = document.createElement('div');
            catItem.className = 'category-item';
            catItem.innerHTML = `
                <span>${category}</span>
                <div class="category-actions">
                    <button class="btn btn-secondary delete-category" data-name="${category}">Delete</button>
                </div>
            `;
            categoriesList.appendChild(catItem);

            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        document.querySelectorAll('.delete-category').forEach(btn => {
            btn.addEventListener('click', () => deleteCategory(btn.dataset.name));
        });
    }

    addPostBtn.addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Add New Post';
        postForm.reset();
        postModal.classList.add('active');
    });

    addCategoryBtn.addEventListener('click', () => {
        const newCategory = prompt('Enter new category name:');
        if (newCategory && !categories.includes(newCategory)) {
            categories.push(newCategory);
            renderCategories();
            updateDashboard();
        }
    });

    closeModal.addEventListener('click', () => {
        postModal.classList.remove('active');
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postData = {
            id: posts.length + 1,
            title: document.getElementById('post-title').value,
            category: document.getElementById('post-category').value,
            excerpt: document.getElementById('post-excerpt').value,
            image: document.getElementById('post-image').value,
            date: document.getElementById('post-date').value,
            readTime: parseInt(document.getElementById('read-time').value)
        };

        posts.push(postData);
        renderPosts();
        updateDashboard();
        postModal.classList.remove('active');
    });

    function editPost(id) {
        const post = posts.find(p => p.id === parseInt(id));
        if (post) {
            document.getElementById('modal-title').textContent = 'Edit Post';
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-excerpt').value = post.excerpt || '';
            document.getElementById('post-image').value = post.image || '';
            document.getElementById('post-date').value = post.date;
            document.getElementById('read-time').value = post.readTime;
            postModal.classList.add('active');

            postForm.onsubmit = (e) => {
                e.preventDefault();
                post.title = document.getElementById('post-title').value;
                post.category = document.getElementById('post-category').value;
                post.excerpt = document.getElementById('post-excerpt').value;
                post.image = document.getElementById('post-image').value;
                post.date = document.getElementById('post-date').value;
                post.readTime = parseInt(document.getElementById('read-time').value);
                renderPosts();
                updateDashboard();
                postModal.classList.remove('active');
            };
        }
    }

    function deletePost(id) {
        if (confirm('Are you sure you want to delete this post?')) {
            posts = posts.filter(p => p.id !== parseInt(id));
            renderPosts();
            updateDashboard();
        }
    }

    function deleteCategory(name) {
        if (confirm('Are you sure you want to delete this category?')) {
            categories = categories.filter(c => c !== name);
            posts = posts.filter(p => p.category !== name);
            renderCategories();
            renderPosts();
            updateDashboard();
        }
    }

    // Settings Form
    document.getElementById('settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Settings saved successfully!');
    });

    // Initial render
    updateDashboard();
    renderPosts();
    renderCategories();
});