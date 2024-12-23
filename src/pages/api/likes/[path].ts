import type { APIRoute } from 'astro';
import { getLikes, incrementLikes } from '../../../utils/db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const pagePath = params.path;
  if (!pagePath) {
    return new Response(JSON.stringify({ error: 'Page path is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const decodedPath = decodeURIComponent(pagePath);
  const likes = await getLikes(decodedPath);
  
  return new Response(JSON.stringify({ likes }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ params }) => {
  const pagePath = params.path;
  if (!pagePath) {
    return new Response(JSON.stringify({ error: 'Page path is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const decodedPath = decodeURIComponent(pagePath);
  const newLikeCount = await incrementLikes(decodedPath);
  
  return new Response(JSON.stringify({ likes: newLikeCount }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
