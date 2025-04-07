/**
 * Contact Form Functionality
 * Handles form submission and validation
 */

(function($) {
    $(document).ready(function() {
        const $contactForm = $('#contact-form');
        const $submitButton = $('#form-submit');
        const $successMessage = $('#form-success');
        const $errorMessage = $('#form-error');
        
        // Form validation
        function validateForm() {
            let isValid = true;
            
            // Reset previous error states
            $('.form-group').removeClass('has-error');
            
            // Validate required fields
            $contactForm.find('.required').each(function() {
                const $input = $(this).find('input, textarea, select');
                if (!$input.val().trim()) {
                    $(this).addClass('has-error');
                    isValid = false;
                }
            });
            
            // Validate email format if provided
            const $emailInput = $('#email');
            if ($emailInput.val().trim() && !isValidEmail($emailInput.val().trim())) {
                $emailInput.closest('.form-group').addClass('has-error');
                isValid = false;
            }
            
            return isValid;
        }
        
        // Email validation helper
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Handle form submission
        $contactForm.on('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                $errorMessage.text('Please fill in all required fields correctly.').show();
                $successMessage.hide();
                return;
            }
            
            // Disable submit button to prevent multiple submissions
            $submitButton.prop('disabled', true).text('Sending...');
            
            // Simulate form submission (in a real scenario, you would send data to a server)
            setTimeout(function() {
                // Hide error message if visible
                $errorMessage.hide();
                
                // Show success message
                $successMessage.show();
                
                // Reset form
                $contactForm[0].reset();
                
                // Re-enable submit button
                $submitButton.prop('disabled', false).text('Send Message');
                
                // Scroll to success message
                $('html, body').animate({
                    scrollTop: $successMessage.offset().top - 100
                }, 500);
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    $successMessage.fadeOut(500);
                }, 5000);
            }, 1500); // Simulate network delay
        });
        
        // Real-time validation on input
        $contactForm.find('input, textarea, select').on('input change', function() {
            const $group = $(this).closest('.form-group');
            
            // Remove error state when user starts typing
            if ($(this).val().trim()) {
                $group.removeClass('has-error');
            }
            
            // Hide error message when user corrects issues
            if (validateForm()) {
                $errorMessage.hide();
            }
        });
    });
})(jQuery);
