export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') {
      const prompt = url.searchParams.get('prompt');
      if (!prompt) {
        return new Response(JSON.stringify({ error: 'Missing prompt parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      try {
        const response = await puter.ai.chat(prompt, { model: 'claude-opus-4-5-20251101' });
        return new Response(JSON.stringify({ response }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    return new Response('Not found', { status: 404 });
  }
};