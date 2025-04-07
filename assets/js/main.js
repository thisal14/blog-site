/**
 * Main JavaScript file for the blog website
 * Includes functionality for navigation, image loading, ad management, and page transitions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Lazy Load Images
    lazyLoadImages();
    
    // Newsletter Form Handling
    initNewsletterForm();
    
    // Initialize AdSense ads
    initAdSense();
    
    // Initialize page transitions
    initPageTransitions();
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
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
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

/**
 * Initialize page transitions
 */
function initPageTransitions() {
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);

    // Handle all internal links
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Only apply to internal links (not external or hash links)
        if (href && href.startsWith('/') || href.includes('html')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const destination = this.getAttribute('href');

                // Start fade out animation
                document.body.classList.add('fade-out');
                transitionOverlay.classList.add('active');

                // Wait for animation to complete
                setTimeout(() => {
                    window.location.href = destination;
                }, 300); // Match this with CSS transition duration
            });
        }
    });

    // Fade in on page load
    window.addEventListener('load', () => {
        document.body.classList.remove('fade-out');
        transitionOverlay.classList.remove('active');
    });
}

// Handle resize events
window.addEventListener('resize', function() {
    const mainNav = document.querySelector('.main-nav');
    if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
    }
});