/**
 * External Links File
 * Centralized management of all external links for the website
 * Created: 2023-11-07
 * Last Modified: 2024-04-15
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
        "home": "/",
        "about": "about",
        "services": "services",
        "pricing": "pricing",
        "contact": "contact",
        "faq": "faq",

        // About Section Links
        "our-story": "ourstory",
        "vision-mission": "visionmission",
        "core-values": "corevalues",
        "decision-making": "decisionmaking",

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
        "download": "assets/resources/Business_Associate_Agreement.pdf",
        "login": "https://app.occuhelp.com",
        "video-summary": "https://www.youtube.com",

        // Resource Links
        "overview-pdf": "assets/resources/OccuHelp_Overview_2025.pdf",
        "video-tutorials": "https://www.youtube.com",
        "system-set-up": "assets/resources/OccuHelp_Set_Up.pdf",
        "white-paper": "assets/resources/OccuHelp_White_Paper_2025.pdf",

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
