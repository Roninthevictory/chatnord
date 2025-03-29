const socket = io();

// Elements
const messagesDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Send message
sendButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    const fullMessage = `${username}: ${message}`;
    socket.emit('chat message', fullMessage);
    messageInput.value = ''; // Clear the message input field
  }
});

// Listen for messages
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the latest message
});
