export function shouldShowSubstack(path: string): boolean {
  // Show Substack embed on the homepage and specific doc pages
  const showOnPaths = [
    '/',
    '/docs/leadership',
    '/docs/team'
  ];

  return showOnPaths.some(p => path === p || path.startsWith(p + '/'));
}
