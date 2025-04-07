# PowerShell script to update absolute URLs by removing .html extension
# Run this script from your website root directory

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

# Define the pattern to match absolute URLs with .html extension
# This pattern looks for occuhelp.com/page.html style URLs
$pattern = '(https?://(?:www\.)?occuhelp\.com/)([^"''#\?]+)\.html([#\?][^"'']*)?["'']'

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the pattern
    $newContent = $content -replace $pattern, '$1$2$3$4'
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $newContent
    
    Write-Host "Updated $($file.FullName)"
}

Write-Host "All files processed. Absolute URLs have been updated to remove .html extensions."
