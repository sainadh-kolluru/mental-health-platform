const API = 'http://localhost:5000/api/admin';

async function loadUsers() {
  const res = await fetch(`${API}/users`);
  const users = await res.json();
  const list = document.getElementById('userList');
  list.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.name} (${u.email}) - ${u.role}`;
    list.appendChild(li);
  });
}

async function loadReportedPosts() {
  const res = await fetch(`${API}/reported-posts`);
  const posts = await res.json();
  const list = document.getElementById('postList');
  list.innerHTML = '';

  posts.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.message} - <small>${p.createdBy}</small> [🚩 ${p.reports}]
      <button onclick="deletePost('${p._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deletePost(id) {
  await fetch(`${API}/post/${id}`, { method: 'DELETE' });
  loadReportedPosts();
}

async function loadResourceStats() {
  const res = await fetch(`${API}/stats/resources`);
  const stats = await res.json();
  const list = document.getElementById('resourceStats');
  list.innerHTML = '';
  for (const [category, count] of Object.entries(stats)) {
    const li = document.createElement('li');
    li.textContent = `${category}: ${count}`;
    list.appendChild(li);
  }
}

async function loadMoodStats() {
  const res = await fetch(`${API}/stats/mood`);
  const data = await res.json();

  const ctx = document.getElementById('moodChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['😢', '😞', '😐', '🙂', '😄'],
      datasets: [{
        label: 'Mood Counts',
        data,
        backgroundColor: ['#777', '#999', '#bbb', '#4caf50', '#2ecc71']
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}

loadUsers();
loadReportedPosts();
loadResourceStats();
loadMoodStats();
