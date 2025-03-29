const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentOwnerLoggedIn = false;

// Static files
app.use(express.static("public"));

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Listen for incoming chat messages
io.on("connection", (socket) => {
  console.log("A user connected");

  // Broadcast when a user sends a chat message
  socket.on("chat message", (username, msg) => {
    if (currentOwnerLoggedIn && username === "Ownerchat") {
      msg = `[owner] ${msg}`; // Add [owner] prefix if logged in as owner
    }
    io.emit("chat message", msg, username);
  });

  // Handle new update for the "New" section
  socket.on("new update", (update) => {
    io.emit("new update", update);
  });

  // Handle update for the "Roadmap" section
  socket.on("update roadmap", (roadmap) => {
    io.emit("updated roadmap", roadmap);
  });

  // Handle update for the "About Us" section
  socket.on("update about us", (aboutUs) => {
    io.emit("updated about us", aboutUs);
  });

  // Handle admin login
  socket.on("admin login", (username, password) => {
    if (username === "Chatnordadmin" && password === "Chatnord123@!") {
      console.log("Admin logged in");
      socket.emit("admin login success");
    } else {
      console.log("Invalid admin credentials");
      socket.emit("admin login failed");
    }
  });

  // Handle owner login
  socket.on("owner login", (isOwner) => {
    if (isOwner) {
      currentOwnerLoggedIn = true;
      console.log("Owner logged in");
      socket.emit("owner login success");
    } else {
      currentOwnerLoggedIn = false;
      socket.emit("owner login failed");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
