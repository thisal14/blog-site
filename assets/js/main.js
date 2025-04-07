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
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.menu-toggle')) {
                mainNav.classList.remove('open');
            }
        });
    }
}

/**
 * Initialize lazy loading for images
 * Uses Intersection Observer API for efficient loading
 */
function lazyLoadImages() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((