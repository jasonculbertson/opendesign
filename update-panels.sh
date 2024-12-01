#!/bin/bash

# List of files to update
files=(
    "src/pages/docs/team/recruiting/job-descriptions-jds.astro"
    "src/content/docs/leadership/departure/transition-plan.mdx"
    "src/content/docs/leadership/month-1/level-competencies.mdx"
    "src/content/docs/leadership/month-1/designer-levels-titles.mdx"
    "src/content/docs/leadership/month-1/level-competencies/photographer.mdx"
    "src/content/docs/leadership/month-1/level-competencies/manager.mdx"
    "src/content/docs/leadership/month-1/level-competencies/product-designer.mdx"
    "src/content/docs/leadership/month-1/level-competencies/design-ops.mdx"
    "src/content/docs/leadership/month-1/level-competencies/content-designer.mdx"
    "src/content/docs/leadership/month-1/level-competencies/graphic-designer.mdx"
    "src/content/docs/leadership/month-1/level-competencies/researcher.mdx"
    "src/content/docs/leadership/quarter-1/self-evaluation.mdx"
    "src/content/docs/leadership/month-1/level-competencies/copywriter.mdx"
    "src/content/docs/team/design/t-shirt-sizing.mdx"
    "src/content/docs/team/product/project-kickoff-meeting.mdx"
    "src/content/docs/leadership/quarter-1/short-term-growth-exercise.mdx"
    "src/content/docs/team/product/product-spec.mdx"
    "src/content/docs/team/product/one-pagers.mdx"
    "src/content/docs/team/recruiting/interview-panels.mdx"
    "src/content/docs/leadership/quarter-2/individual-assessment.mdx"
    "src/content/docs/leadership/quarter-2/long-term-goals.mdx"
    "src/content/docs/team/recruiting/job-descriptions-jds.mdx"
    "src/content/docs/team/design/design-sprint.mdx"
    "src/content/docs/leadership/week-1-2/getting-to-know-you.mdx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Replace the old panel style with the new gradient-panel class
        sed -i '' 's/class="bg-\[#f6f8fa\] border border-\[#e5e7eb\] rounded-lg p-6 my-8"/class="gradient-panel"/g' "$file"
        sed -i '' 's/class="bg-\[#f6f8fa\] border border-\[#e5e7eb\] rounded-lg p-6 mb-8"/class="gradient-panel"/g' "$file"
        echo "Updated $file"
    else
        echo "File not found: $file"
    fi
done
