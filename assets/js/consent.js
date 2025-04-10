/**
 * Cookie Consent Management for OccuHelp
 * Handles user consent for analytics and cookie storage
 */

(function() {
    // Cookie utility functions
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if consent has already been given
    function hasConsent() {
        return getCookie('cookie_consent') === 'accepted';
    }

    // Show the consent banner if no consent has been given
    function showConsentBanner() {
        if (!hasConsent()) {
            var banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.style.display = 'block';
            }
        }
    }

    // Handle accept all cookies
    function acceptAllCookies() {
        setCookie('cookie_consent', 'accepted', 365);

        // Update Google Analytics consent
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });
        }

        // Hide the banner
        var banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    // Handle necessary cookies only
    function acceptNecessaryCookies() {
        setCookie('cookie_consent', 'necessary', 1);

        // Keep Google Analytics consent as denied
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
            });
        }

        // Hide the banner
        var banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    // Initialize consent management
    function init() {
        // Create the consent banner if it doesn't exist
        if (!document.getElementById('cookie-consent-banner')) {
            var banner = document.createElement('div');
            banner.id = 'cookie-consent-banner';
            banner.innerHTML = `
                <div class="container">
                    <div class="content">
                        <h3>Cookie Consent</h3>
                        <p>We use cookies to enhance your experience and analyze site traffic. By clicking "Accept All", you consent to all cookies, or choose "Necessary Only" for essential cookies only.</p>
                    </div>
                    <div class="buttons">
                        <button id="accept-all-cookies" class="button">Accept All</button>
                        <button id="accept-necessary-cookies" class="button alt">Necessary Only</button>
                    </div>
                </div>
            `;
            document.body.appendChild(banner);

            // Add event listeners
            document.getElementById('accept-all-cookies').addEventListener('click', acceptAllCookies);
            document.getElementById('accept-necessary-cookies').addEventListener('click', acceptNecessaryCookies);
        }

        // Show the banner if needed
        showConsentBanner();
    }

    // Run initialization when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
