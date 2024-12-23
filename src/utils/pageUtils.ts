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
    // Add other L2 pages that have L3 content here
  ];
  
  return !pagesWithL3Content.includes(pathname);
}
