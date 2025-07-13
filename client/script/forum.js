const API = 'http://localhost:5000/api/forum';
let currentTopicId = '';
const user = JSON.parse(localStorage.getItem('user')) || { name: "Anon" };

async function createTopic() {
  const title = document.getElementById('topicTitle').value;
  const description = document.getElementById('topicDesc').value;

  await fetch(`${API}/topics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, createdBy: user.name })
  });

  loadTopics();
}

async function loadTopics() {
  const res = await fetch(`${API}/topics`);
  const topics = await res.json();
  const list = document.getElementById('topicList');
  list.innerHTML = '';

  topics.forEach(topic => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${topic.title}</strong> - ${topic.description} 
                    <button onclick="openTopic('${topic._id}', '${topic.title}')">Join</button>`;
    list.appendChild(li);
  });
}

function openTopic(id, title) {
  currentTopicId = id;
  document.getElementById('postsSection').style.display = 'block';
  document.getElementById('topicHeader').innerText = title;
  loadPosts();
}

async function postMessage() {
  const message = document.getElementById('postMsg').value;
  await fetch(`${API}/posts/${currentTopicId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, createdBy: user.name })
  });
  document.getElementById('postMsg').value = '';
  loadPosts();
}

async function loadPosts() {
  const res = await fetch(`${API}/posts/${currentTopicId}`);
  const posts = await res.json();
  const list = document.getElementById('postList');
  list.innerHTML = '';

  posts.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${post.message} - <small>${post.createdBy}</small> 
      ❤️ ${post.upvotes} 
      🚩 ${post.reports}
      <button onclick="upvote('${post._id}')">❤️</button>
      <button onclick="report('${post._id}')">🚩</button>
    `;
    list.appendChild(li);
  });
}

async function upvote(postId) {
  await fetch(`${API}/upvote/${postId}`, { method: 'POST' });
  loadPosts();
}

async function report(postId) {
  await fetch(`${API}/report/${postId}`, { method: 'POST' });
  loadPosts();
}

loadTopics();
