#!/bin/bash

# Find all .astro files in the src/pages directory
find src/pages -name "*.astro" -type f | while read -r file; do
    # Replace mb-4 with mb-2 for breadcrumb navigation
    sed -i '' 's/nav class="flex mb-4" aria-label="Breadcrumb"/nav class="flex mb-2" aria-label="Breadcrumb"/g' "$file"
    # Also catch any mb-8 variants that might have been missed
    sed -i '' 's/nav class="flex mb-8" aria-label="Breadcrumb"/nav class="flex mb-2" aria-label="Breadcrumb"/g' "$file"
    echo "Updated $file"
done
