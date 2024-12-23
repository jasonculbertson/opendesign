export function shouldShowSubstack(pathname: string): boolean {
  // Remove trailing slash for consistent comparison
  const normalizedPath = pathname.replace(/\/$/, '');
  
  // Explicit list of pages that should show the Substack embed
  const pagesWithSubstack = [
    '/docs/videos/interviews',
    '/docs/videos/case-studies',
    '/docs/team/recruiting/interview-panels'
  ];
  
  console.log('Substack Debug:', {
    pathname,
    normalizedPath,
    shouldShow: pagesWithSubstack.includes(normalizedPath)
  });
  
  return pagesWithSubstack.includes(normalizedPath);
}
