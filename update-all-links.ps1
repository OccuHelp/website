# PowerShell script to update all internal links by removing .html extension
# This script handles both relative and absolute URLs

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

# Define patterns for different types of links
$patterns = @(
    # Standard href links to .html files (most common)
    @{
        Pattern = 'href="([^":#\?]+)\.html([#\?][^"]*)?"'
        Replacement = 'href="$1$2"'
    },
    # Links with single quotes
    @{
        Pattern = "href='([^':#\?]+)\.html([#\?][^']*)?'"
        Replacement = "href='`$1`$2'"
    },
    # Absolute URLs to the same domain
    @{
        Pattern = 'href="(https?://(?:www\.)?occuhelp\.com/[^":#\?]+)\.html([#\?][^"]*)?'
        Replacement = 'href="$1$2'
    }
)

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Apply all patterns
    foreach ($patternObj in $patterns) {
        $content = $content -replace $patternObj.Pattern, $patternObj.Replacement
    }
    
    # Only write to the file if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  Updated links in $($file.Name)"
    } else {
        Write-Host "  No changes needed in $($file.Name)"
    }
}

Write-Host "All files processed. Links have been updated to remove .html extensions."
