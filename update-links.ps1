# PowerShell script to update internal links by removing .html extension
# Run this script from your website root directory

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

# Define the pattern to match internal links with .html extension
# This pattern looks for href attributes pointing to internal pages with .html
$pattern = '(href=["''])([^"''#\?]+)\.html([#\?][^"'']*)?["'']'

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

Write-Host "All files processed. Links have been updated to remove .html extensions."
