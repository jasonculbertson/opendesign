import { defineMiddleware } from "astro:middleware";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const onRequest = defineMiddleware(async ({ request, redirect, locals }, next) => {
  const url = new URL(request.url);
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/docs/preview'
  ];

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => 
    url.pathname === path || url.pathname.startsWith(path + '/')
  );

  if (isPublicPath) {
    return next();
  }

  // Get the session token from the request
  const sessionToken = request.headers.get('cookie')?.match(/(?:^|; )__session=([^;]+)/)?.[1];

  if (!sessionToken) {
    return redirect('/login');
  }

  try {
    // Verify the session
    const session = await clerkClient.sessions.verifySession(sessionToken);
    locals.session = session;
    return next();
  } catch (error) {
    console.error('Auth error:', error);
    return redirect('/login');
  }
});
