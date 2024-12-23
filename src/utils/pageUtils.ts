export function shouldShowSubstack(pathname: string): boolean {
  // Remove trailing slash for consistent comparison
  const normalizedPath = pathname.replace(/\/$/, '');

  // Explicit list of pages that should show the Substack embed
  const pagesWithSubstack = [
    // Videos section
    '/docs/videos/interviews',
    '/docs/videos/case-studies',
    
    // Team section
    '/docs/team/design/t-shirt-sizing',
    '/docs/team/design/design-sprint',
    '/docs/team/product/one-pagers',
    '/docs/team/product/product-spec',
    '/docs/team/product/project-kickoff-meeting',
    '/docs/team/recruiting/interview-panels',
    
    // Leadership section
    '/docs/leadership/month-1/designer-levels-titles',
    '/docs/leadership/month-1/level-competencies',
    '/docs/leadership/quarter-1/hiring-plan',
    '/docs/leadership/quarter-1/okrs',
    '/docs/leadership/quarter-2/design-vision',
    '/docs/leadership/quarter-2/design-principles',
    '/docs/leadership/week-1-2/design-process',
    '/docs/leadership/week-1-2/design-critique',
    '/docs/leadership/day-1/first-day',
    '/docs/leadership/day-1/first-week',
    '/docs/leadership/departure/offboarding',
    '/docs/leadership/departure/knowledge-transfer',

    // Job Descriptions - UX Designer
    '/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-1',
    '/docs/team/recruiting/job-descriptions-jds/ux-designer/designer-2',
    '/docs/team/recruiting/job-descriptions-jds/ux-designer/senior-designer',
    '/docs/team/recruiting/job-descriptions-jds/ux-designer/lead-designer',
    '/docs/team/recruiting/job-descriptions-jds/ux-designer/staff-designer',
    '/docs/team/recruiting/job-descriptions-jds/ux-designer/principal-designer',

    // Job Descriptions - UX Writer
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-1',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/writer-2',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/senior-writer',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/lead-writer',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/staff-writer',
    '/docs/team/recruiting/job-descriptions-jds/ux-writer/principal-writer',

    // Job Descriptions - UX Researcher
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-1',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/researcher-2',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/senior-researcher',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/lead-researcher',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/staff-researcher',
    '/docs/team/recruiting/job-descriptions-jds/ux-researcher/principal-researcher',

    // Job Descriptions - Design Ops
    '/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-1',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/design-ops-2',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/senior-design-ops',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/lead-design-ops',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/staff-design-ops',
    '/docs/team/recruiting/job-descriptions-jds/design-ops/principal-design-ops',

    // Job Descriptions - Graphic Designer
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/junior-designer',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/graphic-designer',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/senior-designer',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/art-director',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/associate-creative-director',
    '/docs/team/recruiting/job-descriptions-jds/graphic-designer/creative-director',

    // Job Descriptions - Copywriter
    '/docs/team/recruiting/job-descriptions-jds/copywriter/junior-copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/senior-copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/lead-copywriter',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/associate-creative-director',
    '/docs/team/recruiting/job-descriptions-jds/copywriter/creative-director'
  ];

  return pagesWithSubstack.includes(normalizedPath);
}
