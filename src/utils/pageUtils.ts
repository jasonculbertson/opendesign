export function shouldShowSubstack(pathname: string): boolean {
  // Split path into segments and remove empty strings
  const segments = pathname.split('/').filter(Boolean);
  
  // Don't show on root or L1 pages (e.g., /docs/leadership)
  if (segments.length <= 2) return false;
  
  // Don't show on pages that have L3 content (e.g., /docs/team/recruiting/job-descriptions-jds)
  if (segments.length > 3) return false;

  // Don't show on index pages
  if (segments[segments.length - 1] === 'index') return false;

  // Don't show on pages that are known to have L3 content
  const pagesWithL3Content = [
    '/docs/team/recruiting/job-descriptions-jds',
    '/docs/team/design',           // Has design-sprint, t-shirt-sizing
    '/docs/team/product',          // Has one-pagers, product-spec, etc.
    '/docs/team/recruiting',       // Has job-descriptions-jds
    '/docs/leadership/month-1',    // Has level-competencies
    '/docs/leadership/quarter-1',  // Has sub-pages
    '/docs/leadership/quarter-2',  // Has sub-pages
    '/docs/leadership/week-1-2',   // Has sub-pages
    '/docs/leadership/day-1',      // Has sub-pages
    '/docs/leadership/departure'   // Has sub-pages
  ];
  
  return !pagesWithL3Content.includes(pathname);
}
