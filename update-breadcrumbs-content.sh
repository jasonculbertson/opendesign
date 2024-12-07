#!/bin/bash

# Find all .astro files in the src/pages directory
find src/pages -name "*.astro" -type f | while read -r file; do
    # Get the filename without extension and path
    filename=$(basename "$file" .astro)
    
    # Get the directory path relative to src/pages
    relpath=$(dirname "$file" | sed 's|src/pages/||')
    
    # Skip if the file is in the root pages directory
    if [ "$relpath" = "." ]; then
        continue
    fi
    
    # Create the parent path for breadcrumbs
    parent_path=$(dirname "/$relpath")
    if [ "$parent_path" = "/" ]; then
        continue
    fi
    
    # Update the breadcrumbs array to only include the parent link
    sed -i '' "/const breadcrumbs = \[/,/\];/c\\
const breadcrumbs = [\\
  { text: '$(basename "$parent_path")', href: '$parent_path' }\\
];" "$file"
    
    echo "Updated $file"
done
