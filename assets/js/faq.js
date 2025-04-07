/**
 * FAQ Page Functionality
 * Handles accordion, filtering, and search for the FAQ page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion functionality
    initAccordion();
    
    // Initialize category filtering
    initCategoryFilters();
    
    // Initialize search functionality
    initSearch();
});

/**
 * Initialize accordion functionality for FAQ items
 */
function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Initialize category filtering functionality
 */
function initCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.querySelector('.no-results');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            let visibleItems = 0;
            
            // Show/hide FAQ items based on category
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (noResults) {
                noResults.style.display = visibleItems === 0 ? 'block' : 'none';
            }
        });
    });
    
    // Initialize with "All" selected
    const allButton = document.querySelector('.category-button[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.querySelector('.faq-search input');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.querySelector('.no-results');
    const categoryButtons = document.querySelectorAll('.category-button');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let visibleItems = 0;
            
            // Reset category filters when searching
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.category-button[data-category="all"]').classList.add('active');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (searchTerm === '' || question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (noResults) {
                noResults.style.display = visibleItems === 0 ? 'block' : 'none';
            }
        });
    }
}
