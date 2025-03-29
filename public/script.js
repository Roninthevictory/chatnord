const socket = io();

// Handle tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const targetContent = document.getElementById(`content-${tab.id.split('-')[1]}`);
    document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
    targetContent.classList.add('active');
  });
});

// Handle sending chat messages
const sendButton = document.getElementById('send');
sendButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;

  if (username && message) {
    socket.emit('chat message', username, message);
    document.getElementById('message').value = ''; // Clear message input
  }
});

// Listen for chat messages
socket.on('chat message', (msg, username) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.textContent = `${username}: ${msg}`;
  document.getElementById('messages').appendChild(messageDiv);
});

// Admin login handling
const adminLoginButton = document.getElementById('admin-login');
adminLoginButton.addEventListener('click', () => {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  if (username && password) {
    socket.emit('admin login', username, password);
  }
});

// Listen for admin login success or failure
socket.on('admin login success', () => {
  alert('Admin logged in!');
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
});
socket.on('admin login failed', () => {
  alert('Invalid admin credentials');
});

// Owner login handling
const ownerLoginButton = document.getElementById('login-owner');
ownerLoginButton.addEventListener('click', () => {
  const username = prompt('Enter owner username:');
  const password = prompt('Enter owner password:');

  if (username === 'Ownerchat' && password === 'Ownerofsite123') {
    socket.emit('owner login', true);
  } else {
    alert('Invalid owner credentials');
  }
});

// Listen for owner login success
socket.on('owner login success', () => {
  alert('Owner logged in!');
  document.getElementById('owner-prefix').style.display = 'inline'; // Show [owner] prefix
});

// Handle "New" section updates
const newUpdateButton = document.getElementById('add-update');
newUpdateButton.addEventListener('click', () => {
  const update = prompt('Enter the new update for the "New" section:');
  if (update) {
    socket.emit('new update', update);
  }
});

// Listen for new updates
socket.on('new update', (update) => {
  const newUpdateDiv = document.createElement('div');
  newUpdateDiv.classList.add('update');
  newUpdateDiv.textContent = `New: ${update}`;
  document.getElementById('content-new').appendChild(newUpdateDiv);
});

// Handle Roadmap section updates
const updateRoadmapButton = document.getElementById('edit-roadmap');
updateRoadmapButton.addEventListener('click', () => {
  const roadmap = prompt('Enter or edit the current roadmap:');
  if (roadmap) {
    socket.emit('update roadmap', roadmap);
  }
});

// Listen for roadmap updates
socket.on('updated roadmap', (roadmap) => {
  const roadmapDiv = document.createElement('div');
  roadmapDiv.classList.add('roadmap');
  roadmapDiv.textContent = `Roadmap: ${roadmap}`;
  document.getElementById('content-roadmap').appendChild(roadmapDiv);
});

// Handle About Us section updates
const updateAboutUsButton = document.getElementById('edit-about-us');
updateAboutUsButton.addEventListener('click', () => {
  const aboutUs = prompt('Enter or edit the About Us section:');
  if (aboutUs) {
    socket.emit('update about us', aboutUs);
  }
});

// Listen for About Us updates
socket.on('updated about us', (aboutUs) => {
  const aboutUsDiv = document.createElement('div');
  aboutUsDiv.classList.add('about-us');
  aboutUsDiv.textContent = `About Us: ${aboutUs}`;
  document.getElementById('content-about').appendChild(aboutUsDiv);
});

// Listen for any updates in the chat messages
socket.on('chat message', (msg, username) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.textContent = `${username}: ${msg}`;
  document.getElementById('messages').appendChild(messageDiv);
});
