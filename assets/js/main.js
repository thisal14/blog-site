/**
 * Main JavaScript file for the blog website
 * Includes functionality for navigation, image loading, and ad management
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Lazy Load Images
    lazyLoadImages();
    
    // Newsletter Form Handling
    initNewsletterForm();
    
    // Initialize AdSense ads properly
    initAdSense();
});

/**
 * Initialize mobile menu functionality
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
        
        // Close menu when clicking outside
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
 * Initialize lazy loading for images
 * Uses Intersection Observer API for efficient loading
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
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Add your newsletter submission logic here
            console.log('Subscribed with email:', email);
            this.reset();
            alert('Thanks for subscribing!');
        });
    }
}

/**
 * Initialize AdSense ads
 */
function initAdSense() {
    if (typeof adsbygoogle !== 'undefined') {
        adsbygoogle.push({});
    }
}

// Additional responsive enhancements
window.addEventListener('resize', function() {
    // Close mobile menu on screen resize
    const mainNav = document.querySelector('.main-nav');
    if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
    }
});