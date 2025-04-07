/**
 * JavaScript file for categories page
 * Includes initialization and interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functions
    initMobileMenu();
    lazyLoadImages();
    
    // Add category-specific functionality
    initCategoryCards();
});

/**
 * Initialize mobile menu functionality (copied from main.js)
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', 
                mainNav.classList.contains('open'));
        });
        
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && 
                !event.target.closest('.menu-toggle')) {
                mainNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Initialize lazy loading for images (copied from main.js)
 */
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        lazyImages.forEach(img => {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZjEiLz48L3N2Zz4=';
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Initialize category cards interactivity
 */
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if clicking outside the button
            if (!e.target.closest('.btn')) {
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });
        
        // Add hover effect for description
        const description = card.querySelector('.category-description');
        card.addEventListener('mouseenter', function() {
            description.style.color = 'var(--primary-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            description.style.color = 'var(--text-light)';
        });
    });
}

// Handle resize events
window.addEventListener('resize', function() {
    const mainNav = document.querySelector('.main-nav');
    if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
    }
});