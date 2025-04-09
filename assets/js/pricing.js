/**
 * Pricing Page JavaScript
 * Handles interactive elements on the OccuHelp pricing page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Toggle comparison table visibility
    const comparisonToggle = document.getElementById('comparison-toggle');
    const comparisonContainer = document.getElementById('comparison-container');

    if (comparisonToggle && comparisonContainer) {
        comparisonToggle.addEventListener('click', function() {
            comparisonContainer.classList.toggle('open');
            comparisonToggle.classList.toggle('open');

            // Update button text
            if (comparisonContainer.classList.contains('open')) {
                comparisonToggle.textContent = 'Hide Detailed Comparison';
            } else {
                comparisonToggle.textContent = 'See Detailed Comparison';
            }
        });
    }

    // Highlight the current tier when hovering over a feature in the comparison table
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        const tableRows = comparisonTable.querySelectorAll('tr');
        const headerCells = tableRows[0].querySelectorAll('th');

        tableRows.forEach(function(row, rowIndex) {
            if (rowIndex === 0) return; // Skip header row

            const cells = row.querySelectorAll('td');
            cells.forEach(function(cell, cellIndex) {
                if (cellIndex === 0) return; // Skip feature name cell

                cell.addEventListener('mouseenter', function() {
                    // Highlight the column
                    tableRows.forEach(function(r) {
                        const c = r.children[cellIndex];
                        c.classList.add('highlight');
                    });

                    // Highlight the header
                    headerCells[cellIndex].classList.add('highlight');
                });

                cell.addEventListener('mouseleave', function() {
                    // Remove highlight from column
                    tableRows.forEach(function(r) {
                        const c = r.children[cellIndex];
                        c.classList.remove('highlight');
                    });

                    // Remove highlight from header
                    headerCells[cellIndex].classList.remove('highlight');
                });
            });
        });
    }
});
