const API = 'http://localhost:5000/api/message';
const sender = JSON.parse(localStorage.getItem('user'));
let receiverId = '';

async function sendMsg() {
  const message = document.getElementById('msgInput').value;
  receiverId = document.getElementById('receiverId').value;

  await fetch(`${API}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      senderId: sender.id,
      receiverId,
      message
    })
  });

  document.getElementById('msgInput').value = '';
  loadChat();
}

async function loadChat() {
  if (!receiverId) return;
  const res = await fetch(`${API}/${sender.id}/${receiverId}`);
  const msgs = await res.json();

  const box = document.getElementById('chatBox');
  box.innerHTML = '';

  msgs.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = `${msg.senderId === sender.id ? 'You' : 'Them'}: ${msg.message}`;
    box.appendChild(p);
  });

  box.scrollTop = box.scrollHeight;
}

setInterval(loadChat, 1500); // Auto-refresh every 1.5s
