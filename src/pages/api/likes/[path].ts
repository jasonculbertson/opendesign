import type { APIRoute } from 'astro';
import { getLikes, incrementLikes } from '../../../utils/db';

export const get: APIRoute = ({ params }) => {
  const pagePath = params.path;
  if (!pagePath) {
    return new Response(JSON.stringify({ error: 'Page path is required' }), {
      status: 400,
    });
  }

  const decodedPath = decodeURIComponent(pagePath);
  const likes = getLikes(decodedPath);
  
  return new Response(JSON.stringify({ likes }));
};

export const post: APIRoute = async ({ params }) => {
  const pagePath = params.path;
  if (!pagePath) {
    return new Response(JSON.stringify({ error: 'Page path is required' }), {
      status: 400,
    });
  }

  const decodedPath = decodeURIComponent(pagePath);
  const newLikeCount = incrementLikes(decodedPath);
  
  return new Response(JSON.stringify({ likes: newLikeCount }));
};
