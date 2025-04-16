/**
 * External Links File
 * Centralized management of all external links for the website
 * Created: 2023-11-07
 *
 * This file contains all external links used throughout the website.
 * Update the URLs here to change them across the entire site.
 */

// Initialize the links object when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Define all external links
    const externalLinks = {
        // Social Media Links
        "facebook": "#",
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",

        // Navigation Links
        "home": "index.html",
        "about": "about.html",
        "services": "services.html",
        "pricing": "pricing.html",
        "contact": "contact.html",
        "faq": "faq.html",

        // About Section Links
        "our-story": "ourstory.html",
        "vision-mission": "visionmission.html",
        "core-values": "corevalues.html",
        "decision-making": "decisionmaking.html",

        // External Resources
        "blog": "#",
        "resources": "#",
        "support": "#",
        "documentation": "#",

        // Legal Pages
        "privacy-policy": "#",
        "terms-of-service": "#",
        "cookie-policy": "#",

        // Partner Links
        "partner1": "#",
        "partner2": "#",
        "partner3": "#",

        // Call to Action Links
        "get-started": "#",
        "free-trial": "#",
        "demo": "#",
        "download": "#",
        "login": "https://app.occuhelp.com",
        "video-summary": "https://www.youtube.com",

        // Blog Links
        "self-care-monitoring": "#",
        "subheading1": "#",
        "subheading2": "#",
        "subheading3": "#",
        "subheading4": "#",
        "subheading5": "#",

        // Other Common Links
        "continue-reading": "#",
        "learn-more": "#",
        "view-details": "#",

        // Internal Anchors
        "tools": "#tools"
    };

    // Find all link elements with the data-link attribute
    const linkElements = document.querySelectorAll('a[data-link]');

    // Update each link with the corresponding URL from the externalLinks object
    linkElements.forEach(element => {
        const linkKey = element.getAttribute('data-link');
        if (externalLinks[linkKey]) {
            element.href = externalLinks[linkKey];
        } else {
            console.warn(`Link key "${linkKey}" not found in external-links.js`);
        }
    });
});
