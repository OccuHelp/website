/**
 * Checkbox Enhancement Script
 * Improves the behavior of checkboxes in the contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all checkboxes in the form
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Add click event listeners to each checkbox
    checkboxes.forEach(checkbox => {
        // Add a click event that ensures proper visual feedback
        checkbox.addEventListener('click', function() {
            // Force a redraw to ensure the checkbox state is visually updated
            this.style.appearance = 'none';
            setTimeout(() => {
                this.style.appearance = 'auto';
            }, 10);
            
            // Remove focus to prevent the focus outline from staying
            setTimeout(() => {
                this.blur();
            }, 100);
        });
        
        // Make the associated label also toggle the checkbox
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            label.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default label behavior
                checkbox.checked = !checkbox.checked; // Toggle checkbox state
                
                // Force a redraw to ensure the checkbox state is visually updated
                checkbox.style.appearance = 'none';
                setTimeout(() => {
                    checkbox.style.appearance = 'auto';
                }, 10);
            });
        }
    });
});
