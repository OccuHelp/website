/**
 * FAQ Page Functionality
 * Handles accordion functionality for the FAQ page
 */

(function($) {
    $(document).ready(function() {
        // Add a small delay to ensure everything is loaded properly
        $('.faq-accordion').css('opacity', '0');

        setTimeout(function() {
            $('.faq-accordion').animate({opacity: 1}, 200);
        }, 50);
        // Wrap all answer content in a container div for better animation control
        $('.faq-answer').each(function() {
            var content = $(this).html();
            $(this).html('<div class="faq-answer-inner">' + content + '</div>');
        });

        // Initialize accordion functionality
        $('.faq-question').on('click', function() {
            var $item = $(this).parent();
            var $answer = $(this).next('.faq-answer');
            var $content = $answer.find('.faq-answer-inner');

            // Check if this item is already active
            var isActive = $item.hasClass('active');

            // Handle closing animation
            if (isActive) {
                // First fade out the content to prevent text movement
                $content.css('opacity', '0');

                // After a tiny delay, slide up the container
                setTimeout(function() {
                    $item.removeClass('active');
                    $answer.stop(true, true).slideUp(200, function() {
                        // Reset opacity after animation completes and element is hidden
                        $content.css('opacity', '1');
                    });
                }, 30);
            }
            // Handle opening animation
            else {
                // First close any open items
                var $openItems = $('.faq-item.active').not($item);

                if ($openItems.length) {
                    // Fade out content of items being closed
                    $openItems.find('.faq-answer-inner').css('opacity', '0');

                    // After a tiny delay, slide them up
                    setTimeout(function() {
                        $openItems.removeClass('active');
                        $openItems.find('.faq-answer').stop(true, true).slideUp(180, function() {
                            // Reset opacity after animation completes
                            $(this).find('.faq-answer-inner').css('opacity', '1');
                        });
                    }, 30);
                }

                // Then open the clicked item
                $item.addClass('active');

                // First ensure the content is invisible
                $content.css('opacity', '0');

                // Slide down the container
                $answer.stop(true, true).slideDown(250, function() {
                    // Fade in the content after the container is fully expanded
                    $content.animate({opacity: 1}, 150);
                });
            }
        });

        // Hide all answers initially with proper setup
        $('.faq-answer').hide();
        $('.faq-answer-inner').css('opacity', '1');
    });
})(jQuery);
