const API = 'http://localhost:5000/api/mood';

// Safely get user ID from localStorage
const rawUser = localStorage.getItem('user');
let userId = 'guest'; // fallback for testing

if (rawUser) {
  try {
    const user = JSON.parse(rawUser);
    if (user && user.id) {
      userId = user.id;
    }
  } catch (e) {
    console.warn('Invalid user in localStorage');
  }
}

async function submitMood() {
  const mood = parseInt(document.getElementById('moodSelect').value);

  const res = await fetch(`${API}/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, mood })
  });

  if (res.ok) {
    alert('Mood tracked!');
    loadHistory();
  } else {
    alert('Failed to track mood.');
  }
}

async function loadHistory() {
  const res = await fetch(`${API}/${userId}`);
  const data = await res.json();

  const list = document.getElementById('moodHistory');
  list.innerHTML = '';

  data.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${formatMood(entry.mood)} — ${new Date(entry.date).toLocaleDateString()} ${new Date(entry.date).toLocaleTimeString()}`;
    list.appendChild(li);
  });
}

function formatMood(value) {
  switch (value) {
    case 1: return '😢 Very Sad';
    case 2: return '😔 Sad';
    case 3: return '😐 Neutral';
    case 4: return '🙂 Happy';
    case 5: return '😄 Very Happy';
    default: return '❓ Unknown';
  }
}

loadHistory(); // Load on page open
