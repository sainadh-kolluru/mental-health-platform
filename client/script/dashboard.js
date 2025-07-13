const API = 'http://localhost:5000/api/posts';

async function submitPost() {
  const content = document.getElementById('postContent').value;

  const res = await fetch(`${API}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  });

  if (res.ok) {
    document.getElementById('postContent').value = '';
    loadPosts();
  } else {
    const err = await res.text();
    console.error('Failed to post:', err);
    alert('Failed to post. See console.');
  }
}

async function loadPosts() {
  try {
    const res = await fetch(`${API}/all`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Server responded with ${res.status}: ${error}`);
    }

    const posts = await res.json();

    const wall = document.getElementById('postWall');
    wall.innerHTML = '';

    posts.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p>${post.content}</p>
        <small>${new Date(post.createdAt).toLocaleString()}</small><br>
        ❤️ ${post.reactions?.heart || 0} 
        ⭐ ${post.reactions?.star || 0}
        <button onclick="react('${post._id}', 'heart')">❤️</button>
        <button onclick="react('${post._id}', 'star')">⭐</button>
        <hr>
      `;
      wall.appendChild(div);
    });
  } catch (err) {
    console.error('Uncaught Error loading posts:', err);
    alert('Error loading posts. Check console.');
  }
}

async function react(id, type) {
  await fetch(`${API}/${id}/react`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reaction: type })
  });
  loadPosts();
}

loadPosts(); // Load on page load
