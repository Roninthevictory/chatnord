const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (CSS, JS) from the "public" folder
app.use(express.static('public'));

// Handle incoming connections
io.on('connection', (socket) => {
  const ipAddress = socket.handshake.address; // Get the IP address of the client
  console.log(`A user connected from IP: ${ipAddress}`); // Log IP in console

  // Broadcast message when a user sends a new chat message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`A user disconnected from IP: ${ipAddress}`);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
