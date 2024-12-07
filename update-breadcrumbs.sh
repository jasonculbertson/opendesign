#!/bin/bash

# Find all .astro files in the src directory
find src -name "*.astro" -type f | while read -r file; do
    # Replace mb-8 with mb-4 for breadcrumb navigation
    sed -i '' 's/nav class="flex mb-8" aria-label="Breadcrumb"/nav class="flex mb-4" aria-label="Breadcrumb"/g' "$file"
    echo "Updated $file"
done
