/**
 * Services Page JavaScript
 *
 * This script handles the interactive elements on the services page:
 * 1. Carousel functionality for navigating between service categories
 * 2. Dropdown functionality for expanding/collapsing tool descriptions
 *
 * The code is organized into two main functions:
 * - initCarousel(): Handles the category navigation carousel
 * - initDropdowns(): Handles the expandable/collapsible content sections
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the category carousel
    initCarousel();

    // Initialize the dropdown functionality
    initDropdowns();

    // Preload carousel content
    preloadCarouselContent();
});

/**
 * Preloads carousel content to improve navigation performance
 * - Prepares all carousel slides for quick display
 * - Preloads images in the background
 */
function preloadCarouselContent() {
    // Show loading indicator
    const loader = document.getElementById('carousel-loader');

    // Get all carousel slides
    const slides = document.querySelectorAll('.carousel-slide');

    // Preload all images in the carousel
    const images = document.querySelectorAll('.carousel-slide img');
    let loadedImages = 0;

    // If there are no images, hide loader immediately
    if (images.length === 0) {
        finishLoading();
        return;
    }

    // Force browser to load images
    images.forEach(img => {
        // Create a new Image object to preload without affecting the page
        const preloadImg = new Image();

        // When image loads, check if all images are loaded
        preloadImg.onload = function() {
            loadedImages++;
            if (loadedImages >= images.length) {
                finishLoading();
            }
        };

        // If image fails to load, still count it
        preloadImg.onerror = function() {
            loadedImages++;
            if (loadedImages >= images.length) {
                finishLoading();
            }
        };

        // Start loading the image
        preloadImg.src = img.src;
    });

    // Set a maximum wait time (3 seconds) in case some images don't load
    setTimeout(finishLoading, 3000);

    // Function to finish loading process
    function finishLoading() {
        // Only run once
        if (loader.classList.contains('hidden')) return;

        // Touch all slides to ensure they're in the render tree
        slides.forEach(slide => {
            // Force a reflow on each slide
            void slide.offsetHeight;

            // Prepare all dropdown items in this slide
            const dropdowns = slide.querySelectorAll('.dropdown-item');
            dropdowns.forEach(dropdown => {
                // Force a reflow on each dropdown
                void dropdown.offsetHeight;
            });
        });

        // Hide the loader
        loader.classList.add('hidden');
    }
}

/**
 * Initializes the category carousel functionality
 * - Sets up navigation between category slides
 * - Handles prev/next button functionality
 * - Updates ARIA attributes for accessibility
 */
function initCarousel() {
    // Get all carousel slides
    const slides = document.querySelectorAll('.carousel-slide');
    const navButtons = document.querySelectorAll('.category-nav');
    const prevButton = document.querySelector('.carousel-arrow.carousel-prev');
    const nextButton = document.querySelector('.carousel-arrow.carousel-next');

    let currentSlide = 0;

    /**
     * Shows a specific slide and updates the UI accordingly
     * @param {number} index - The index of the slide to show
     */
    function showSlide(index) {
        // Immediately update the navigation UI to feel more responsive
        navButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        // Hide all slides
        slides.forEach(slide => {
            if (slide !== slides[index]) {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Show the selected slide
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');

        // Navigation buttons already updated above

        // Update prev/next button states
        prevButton.classList.toggle('disabled', index === 0);
        nextButton.classList.toggle('disabled', index === slides.length - 1);

        // Update current slide index
        currentSlide = index;
    }

    // Add click event to navigation buttons
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
        });
    });

    // Add click event to prev button
    prevButton.addEventListener('click', function() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });

    // Add click event to next button
    nextButton.addEventListener('click', function() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    });

    // Initialize with the first slide
    showSlide(0);
}

/**
 * Initializes the dropdown functionality for tool items
 * - Sets up click handlers for expanding/collapsing content
 * - Opens the first item in each section by default
 * - Updates ARIA attributes for accessibility
 */
function initDropdowns() {
    // Get all dropdown headers
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');

    // Add click event to each header
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on parent
            const parent = this.parentElement;
            const isActive = parent.classList.toggle('active');

            // Get the content element
            const content = this.nextElementSibling;

            // Update ARIA attributes
            this.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            // Toggle the content visibility with smoother animation
            if (content.style.maxHeight) {
                // Closing animation
                content.style.maxHeight = null;
            } else {
                // Opening animation - set an initial height then calculate the actual height
                content.style.maxHeight = '1000px'; // Temporary large value
                // Force a reflow to ensure the transition works
                void content.offsetWidth;
                // Set the actual height
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Ensure all dropdowns are closed by default
    document.querySelectorAll('.dropdown-item').forEach(item => {
        const header = item.querySelector('.dropdown-header');
        const content = item.querySelector('.dropdown-content');

        if (header && content) {
            item.classList.remove('active');
            content.style.maxHeight = null;
            header.setAttribute('aria-expanded', 'false');
        }
    });
}
