#!/bin/bash

# Function to get the parent path and section name
get_breadcrumb_info() {
    local file_path=$1
    # Remove src/pages/docs/ prefix and .astro suffix
    local relative_path=${file_path#src/pages/docs/}
    relative_path=${relative_path%.astro}
    
    # Get the section (first directory)
    local section=$(echo "$relative_path" | cut -d'/' -f1)
    section=$(echo "$section" | sed 's/\b\(.\)/\u\1/g' | sed 's/-/ /g')
    
    # Get parent directory
    local parent_dir=$(dirname "/$relative_path")
    local parent_name=$(basename "$parent_dir")
    parent_name=$(echo "$parent_name" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
    
    echo "  { text: '$section', href: '/docs/$section' },"
    echo "  { text: '$parent_name', href: '$parent_dir' }"
}

# Find all .astro files in the docs directory
find src/pages/docs -name "*.astro" -type f | while read -r file; do
    # Skip if it's an index file
    if [[ $(basename "$file") == "index.astro" || $(basename "$file") == "[...slug].astro" ]]; then
        continue
    fi
    
    # Get breadcrumb information
    breadcrumb_info=$(get_breadcrumb_info "$file")
    
    # Create the new breadcrumbs content
    breadcrumbs_content="const breadcrumbs = [\n$breadcrumb_info\n];"
    
    # Update the file
    sed -i '' -e "/const breadcrumbs = \[/,/\];/c\\
$breadcrumbs_content" \
    -e 's/{breadcrumbs.map((crumb) => (/{breadcrumbs.map((crumb, index) => (/' \
    -e '/^[ ]*<li class="flex items-center">/c\
            <li class="flex items-center">\
              {index > 0 \&\& <span class="mx-2 text-gray-400">/</span>}\
              {crumb.href ? (\
                <a href={crumb.href} class="text-sm text-gray-600 hover:text-gray-900">\
                  {crumb.text}\
                </a>\
              ) : (\
                <span class="text-sm text-gray-600">{crumb.text}</span>\
              )}' "$file"
    
    echo "Reverted $file"
done
