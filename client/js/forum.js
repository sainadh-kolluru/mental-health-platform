document.addEventListener('DOMContentLoaded', () => {
  const forumContainer = document.getElementById('forum-posts');
  const form = document.getElementById('post-form');

  async function fetchForumPosts() {
    try {
      const res = await fetch('/api/forum');
      const posts = await res.json();
      renderPosts(posts);
    } catch (err) {
      console.error('Fetch error:', err.message);
    }
  }

  function renderPosts(posts) {
    forumContainer.innerHTML = '';
    posts.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${post.title || 'No Title'}</h3>
        <p>${post.content}</p>
        <small>Posted by ${post.user || 'Anonymous'} at ${new Date(post.createdAt).toLocaleString()}</small>
        <hr>
      `;
      forumContainer.appendChild(div);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
      const res = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });

      if (!res.ok) throw new Error('Post failed');

      form.reset();
      fetchForumPosts();
    } catch (err) {
      console.error('Error submitting post:', err.message);
    }
  });

  fetchForumPosts();
});
