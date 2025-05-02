document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active')) {
            if (!event.target.closest('.main-nav')) {
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Handle code highlighting if Prism.js is available
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});
