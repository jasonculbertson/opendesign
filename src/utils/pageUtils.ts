export function shouldShowSubstack(pathname: string): boolean {
  // Explicit list of pages that should show the Substack embed
  const pagesWithSubstack = [
    '/docs/videos/interviews',
    '/docs/videos/case-studies',
    '/docs/team/recruiting/interview-panels'
  ];
  
  console.log('Substack Debug:', {
    pathname,
    shouldShow: pagesWithSubstack.includes(pathname)
  });
  
  return pagesWithSubstack.includes(pathname);
}
