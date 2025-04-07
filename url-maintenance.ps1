# URL Maintenance Utility for OccuHelp Website
# This script helps maintain clean URLs by updating internal links
# Usage: Run this script from the website root directory

# Display header
Write-Host "OccuHelp URL Maintenance Utility" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "This script helps maintain clean URLs across your website."
Write-Host ""

# Function to update links in HTML files
function Update-InternalLinks {
    param (
        [string]$Pattern,
        [string]$Replacement,
        [string]$Description
    )
    
    Write-Host "Starting: $Description" -ForegroundColor Yellow
    
    # Get all HTML files
    $htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse
    $changedFiles = 0
    
    foreach ($file in $htmlFiles) {
        # Read the file content
        $content = Get-Content -Path $file.FullName -Raw
        $originalContent = $content
        
        # Apply the pattern
        $content = $content -replace $Pattern, $Replacement
        
        # Only write to the file if changes were made
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "  Updated: $($file.Name)" -ForegroundColor Green
            $changedFiles++
        }
    }
    
    if ($changedFiles -gt 0) {
        Write-Host "Completed: Updated $changedFiles files" -ForegroundColor Green
    } else {
        Write-Host "Completed: No files needed updates" -ForegroundColor Green
    }
    Write-Host ""
}

# Menu system
function Show-Menu {
    Write-Host "Available Operations:" -ForegroundColor Cyan
    Write-Host "1. Fix Home links (change 'index' to '/')"
    Write-Host "2. Remove .html extensions from links"
    Write-Host "3. Fix absolute URLs (change domain.com/page.html to domain.com/page)"
    Write-Host "4. Run all operations"
    Write-Host "Q. Quit"
    Write-Host ""
    
    $choice = Read-Host "Select an operation (1-4, or Q to quit)"
    
    switch ($choice) {
        "1" {
            Update-InternalLinks -Pattern 'href="index"' -Replacement 'href="/"' -Description "Fixing Home links"
            Update-InternalLinks -Pattern "href='index'" -Replacement "href='/'" -Description "Fixing Home links (single quotes)"
            Show-Menu
        }
        "2" {
            Update-InternalLinks -Pattern 'href="([^":#\?]+)\.html([#\?][^"]*)?"' -Replacement 'href="$1$2"' -Description "Removing .html extensions"
            Update-InternalLinks -Pattern "href='([^':#\?]+)\.html([#\?][^']*)?'" -Replacement "href='`$1`$2'" -Description "Removing .html extensions (single quotes)"
            Show-Menu
        }
        "3" {
            Update-InternalLinks -Pattern 'href="(https?://(?:www\.)?occuhelp\.com/[^":#\?]+)\.html([#\?][^"]*)?' -Replacement 'href="$1$2' -Description "Fixing absolute URLs"
            Show-Menu
        }
        "4" {
            Update-InternalLinks -Pattern 'href="index"' -Replacement 'href="/"' -Description "Fixing Home links"
            Update-InternalLinks -Pattern "href='index'" -Replacement "href='/'" -Description "Fixing Home links (single quotes)"
            Update-InternalLinks -Pattern 'href="([^":#\?]+)\.html([#\?][^"]*)?"' -Replacement 'href="$1$2"' -Description "Removing .html extensions"
            Update-InternalLinks -Pattern "href='([^':#\?]+)\.html([#\?][^']*)?'" -Replacement "href='`$1`$2'" -Description "Removing .html extensions (single quotes)"
            Update-InternalLinks -Pattern 'href="(https?://(?:www\.)?occuhelp\.com/[^":#\?]+)\.html([#\?][^"]*)?' -Replacement 'href="$1$2' -Description "Fixing absolute URLs"
            Show-Menu
        }
        "Q" { 
            Write-Host "Exiting URL Maintenance Utility" -ForegroundColor Cyan
            return 
        }
        "q" { 
            Write-Host "Exiting URL Maintenance Utility" -ForegroundColor Cyan
            return 
        }
        default { 
            Write-Host "Invalid choice. Please try again." -ForegroundColor Red
            Show-Menu
        }
    }
}

# Start the menu
Show-Menu
