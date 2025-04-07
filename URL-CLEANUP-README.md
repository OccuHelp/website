# URL Cleanup Instructions for OccuHelp.com

This guide explains how to implement clean URLs without the .html extension on your website.

## Why Remove .html Extensions?

1. **Professional Appearance**: URLs like `occuhelp.com/about` look cleaner than `occuhelp.com/about.html`
2. **SEO Benefits**: Search engines prefer cleaner URLs
3. **Future-Proofing**: If you ever change technologies (e.g., from HTML to PHP), your URLs won't need to change
4. **Consistency**: Creates a more consistent URL structure

## Implementation Steps

### 1. Server Configuration

#### For Apache Servers:
- Upload the `.htaccess` file to your website's root directory
- Make sure your hosting provider has mod_rewrite enabled (most do)

#### For IIS Servers:
- Upload the `web.config` file to your website's root directory
- Make sure URL Rewrite module is installed on your server

### 2. Update Internal Links

#### Automatic Method:
1. Run the PowerShell script `update-links.ps1` from your website directory:
   ```
   .\update-links.ps1
   ```
2. Run the PowerShell script `update-absolute-urls.ps1` to fix any absolute URLs:
   ```
   .\update-absolute-urls.ps1
   ```

#### Manual Method:
If you prefer to update links manually or the scripts don't work for your setup:
1. Open each HTML file
2. Find all internal links (href attributes pointing to your own pages)
3. Remove the .html extension from these links
   - Change `<a href="about.html">` to `<a href="about">`
   - Change `<a href="services.html">` to `<a href="services">`

### 3. Update Sitemap

If you have a sitemap.xml file, update all URLs to remove the .html extension.

### 4. Test Thoroughly

1. Test all navigation links
2. Test direct URL access (typing URLs directly in the browser)
3. Test redirects from old .html URLs to new clean URLs
4. Test the 404 error page

### 5. Update External References

If you have control over external links pointing to your site (e.g., social media profiles, business listings), update those to use the new URL format.

## Troubleshooting

### Common Issues:

1. **Rewrite Rules Not Working**:
   - Make sure your server has mod_rewrite enabled
   - Check file permissions on .htaccess or web.config
   - Contact your hosting provider for assistance

2. **Broken Links After Update**:
   - Run a link checker tool to find any missed links
   - Check for hardcoded links in JavaScript files

3. **404 Errors**:
   - Verify the .htaccess or web.config file is properly uploaded
   - Check for syntax errors in your rewrite rules

## Need Help?

If you encounter any issues implementing these changes, please contact your web developer or hosting provider for assistance.
