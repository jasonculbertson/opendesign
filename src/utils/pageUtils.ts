export function shouldShowSubstack(path: string): boolean {
  // Show Substack embed on specific doc pages
  const showOnPaths = [
    '/',
    '/docs/leadership/day-1',
    '/docs/leadership/week-1-2',
    '/docs/leadership/month-1',
    '/docs/leadership/quarter-1',
    '/docs/leadership/quarter-2',
    '/docs/leadership/departure',
    '/docs/team/design',
    '/docs/team/product',
    '/docs/team/recruiting',
    '/docs/team/recruiting/job-descriptions-jds',
    '/docs/videos/case-studies',
    '/docs/videos/interviews'
  ];

  // Check if the path matches exactly or is a child of one of the showOnPaths
  return showOnPaths.some(p => path === p || path.startsWith(p + '/'));
}
