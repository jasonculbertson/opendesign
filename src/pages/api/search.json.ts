import { getCollection } from 'astro:content';

export async function GET({ url }) {
  try {
    const query = url.searchParams.get('q')?.toLowerCase() || '';
    
    if (!query || query.length < 2) {
      return new Response(JSON.stringify({ results: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const docs = await getCollection('docs');
    
    const results = docs
      .filter(doc => {
        const titleMatch = doc.data.title?.toLowerCase().includes(query);
        const descriptionMatch = doc.data.description?.toLowerCase().includes(query);
        const bodyMatch = doc.body?.toLowerCase().includes(query);
        const tagsMatch = doc.data.tags?.some(tag => tag.toLowerCase().includes(query));
        const categoryMatch = doc.data.category?.toLowerCase().includes(query);
        
        return titleMatch || descriptionMatch || bodyMatch || tagsMatch || categoryMatch;
      })
      .map(doc => ({
        title: doc.data.title,
        description: doc.data.description || '',
        url: `/docs/${doc.slug}`,
        category: doc.data.category || 'Documentation',
        excerpt: doc.body.slice(0, 150) + '...'
      }))
      .slice(0, 5);

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ 
      error: 'Search failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}