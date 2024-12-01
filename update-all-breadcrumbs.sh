#!/bin/bash

# Function to get the parent directory name and path
get_parent_info() {
    local file_path=$1
    # Remove src/pages/ prefix and .astro suffix
    local relative_path=${file_path#src/pages/}
    relative_path=${relative_path%.astro}
    # Get parent directory
    local parent_dir=$(dirname "/$relative_path")
    local parent_name=$(basename "$parent_dir")
    # Capitalize first letter and replace hyphens with spaces
    parent_name=$(echo "$parent_name" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
    echo "  { text: '$parent_name', href: '$parent_dir' }"
}

# Find all .astro files in the docs directory
find src/pages/docs -name "*.astro" -type f | while read -r file; do
    # Skip if it's an index file
    if [[ $(basename "$file") == "index.astro" ]]; then
        continue
    fi
    
    # Get parent directory information
    parent_info=$(get_parent_info "$file")
    
    # Create the new breadcrumbs content
    breadcrumbs_content="const breadcrumbs = [\n$parent_info\n];"
    
    # Update the file
    # 1. Find the breadcrumbs array
    # 2. Replace it with our new content
    # 3. Update the template to use the simplified version
    sed -i '' -e "/const breadcrumbs = \[/,/\];/c\\
$breadcrumbs_content" \
    -e 's/{breadcrumbs.map((crumb, index) => (/{breadcrumbs.map((crumb) => (/' \
    -e '/{index > 0 && <span class="mx-2 text-gray-400">\//d' \
    -e '/{crumb.href ? (/,/)}$/c\
              <a href={crumb.href} class="text-sm text-gray-600 hover:text-gray-900">\
                {crumb.text}\
              </a>' "$file"
    
    echo "Updated $file"
done
