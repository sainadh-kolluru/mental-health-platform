const API = 'http://localhost:5000/api/resource';
const user = JSON.parse(localStorage.getItem('user')) || { name: "admin" };

async function addResource() {
  const title = document.getElementById('resTitle').value;
  const content = document.getElementById('resContent').value;
  const category = document.getElementById('resCategory').value;
  const type = document.getElementById('resType').value;

  await fetch(`${API}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, category, type, uploadedBy: user.name })
  });

  loadResources();
}

async function loadResources() {
  const res = await fetch(`${API}/all`);
  const data = await res.json();
  const list = document.getElementById('resourceList');
  list.innerHTML = '';

  data.forEach(r => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${r.title}</h4>
      <p>Category: ${r.category} | Type: ${r.type}</p>
      ${r.type === 'video' ? `<iframe width="300" height="200" src="${r.content}" frameborder="0" allowfullscreen></iframe>` : `<p>${r.content}</p>`}
      <hr>
    `;
    list.appendChild(div);
  });
}

loadResources();
