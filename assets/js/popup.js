/**
 * Popup/Dialog Box Functionality
 * Handles opening and closing of feature information popups
 */

document.addEventListener('DOMContentLoaded', function() {
    // Feature data for each icon
    const featureData = {
        'database': {
            title: 'Comprehensive Data Management',
            image: 'images/banner.jpg',
            content: 'Our robust data management system allows you to store, organize, and access all your occupational health data in one secure location. Designed with both usability and security in mind, it streamlines your workflow while ensuring compliance with industry regulations. The system supports real-time updates and integrates seamlessly with your existing infrastructure.'
        },
        'chart-line': {
            title: 'Advanced Analytics',
            image: 'images/pic01.jpg',
            content: 'Transform your data into actionable insights with our powerful analytics tools. Identify trends, predict potential issues, and make data-driven decisions to improve workplace safety and health outcomes. Our customizable dashboards provide at-a-glance information that matters most to your organization. Generate comprehensive reports with just a few clicks.'
        },
        'meteor': {
            title: 'Fast & Responsive Technology',
            image: 'images/pic02.jpg',
            content: 'Built on modern technology stacks, our platform delivers lightning-fast performance across all devices. The responsive design ensures a seamless experience whether you\'re at your desk or in the field. Our cloud-based architecture provides reliable access from anywhere, anytime. Regular updates bring you the latest features without disrupting your workflow.'
        },
        'shield-alt': {
            title: 'Enterprise-Grade Security',
            image: 'images/pic03.jpg',
            content: 'Your data security is our top priority. We implement industry-leading encryption, regular security audits, and strict access controls to protect your sensitive information. Our platform is fully compliant with HIPAA and other relevant regulations. Automated backups ensure your data is never lost, while detailed audit logs track all system activities.'
        }
    };

    // Create popup HTML structure
    const popupHTML = `
        <div class="popup-overlay">
            <div class="popup-container">
                <button class="popup-close"></button>
                <img class="popup-image" src="" alt="Feature image">
                <div class="popup-content">
                    <div class="popup-header">
                        <h3></h3>
                    </div>
                    <div class="popup-body">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add popup to the document
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Get popup elements
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupImage = document.querySelector('.popup-image');
    const popupTitle = document.querySelector('.popup-header h3');
    const popupContent = document.querySelector('.popup-body p');
    const popupClose = document.querySelector('.popup-close');

    // Get all feature icons
    const featureIcons = document.querySelectorAll('.box.highlight ul.special li a');

    // Add click event to each icon
    featureIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();

            // Determine which feature was clicked
            let featureKey = '';
            if (this.classList.contains('fa-database')) featureKey = 'database';
            else if (this.classList.contains('fa-chart-line')) featureKey = 'chart-line';
            else if (this.classList.contains('fa-meteor')) featureKey = 'meteor';
            else if (this.classList.contains('fa-shield-alt')) featureKey = 'shield-alt';

            // If we have data for this feature, show the popup
            if (featureKey && featureData[featureKey]) {
                const data = featureData[featureKey];

                // Set popup content
                popupImage.src = data.image;
                popupImage.alt = data.title;
                popupTitle.textContent = data.title;
                popupContent.textContent = data.content;

                // Show popup
                popupOverlay.classList.add('active');
                document.body.classList.add('popup-open');
            }
        });
    });

    // Close popup when clicking the close button
    popupClose.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        document.body.classList.remove('popup-open');
    });

    // Close popup when clicking outside the popup
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    });
});
