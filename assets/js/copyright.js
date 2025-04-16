/**
 * Copyright Information Script
 * Automatically generates the complete copyright notice in the footer
 * Created: 2023
 * Last Modified: 2023-11-07
 * Purpose: Centralized management of copyright information for legal documentation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all copyright container elements
    const copyrightElements = document.querySelectorAll('.copyright-container');

    // Set up the copyright information
    const startYear = 2023; // The year the copyright started
    const currentYear = new Date().getFullYear();
    const yearDisplay = startYear === currentYear ? startYear : startYear + '-' + currentYear;
    const companyName = 'OccuHelp';
    const rightsText = 'All rights reserved.';

    // Create the full copyright text
    const fullCopyrightText = `© ${yearDisplay} ${companyName}. ${rightsText}`;

    // Update all copyright containers with the full text
    copyrightElements.forEach(element => {
        element.textContent = fullCopyrightText;
    });
});
