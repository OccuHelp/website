/**
 * Copyright Information Script
 * Automatically generates the complete copyright notice in the footer
 * Created: 2023
 * Last Modified: 2026-02-17
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
    const fullCopyrightText = `\u00A9 ${yearDisplay} ${companyName}. ${rightsText}`;

    // Update all copyright containers with the full text
    copyrightElements.forEach(element => {
        element.textContent = fullCopyrightText;
    });

    // Add Privacy Policy and Terms of Service links after the copyright
    const copyrightDivs = document.querySelectorAll('#copyright .menu');
    copyrightDivs.forEach(menu => {
        const privacyLi = document.createElement('li');
        privacyLi.innerHTML = '<a href="/privacy.html">Privacy Policy</a>';
        menu.appendChild(privacyLi);

        const termsLi = document.createElement('li');
        termsLi.innerHTML = '<a href="/termsofservice.html">Terms of Service</a>';
        menu.appendChild(termsLi);
    });
});
