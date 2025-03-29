const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Admin credentials
const ADMIN_USERNAME = "Chatnordadmin";
const ADMIN_PASSWORD = "Chatnord123@!";
const OWNER_USERNAME = "Ownerchat";
const OWNER_PASSWORD = "Ownerofsite123";

// Store current content for updates
let newText = "This is the New section.";
let roadmapText = "This is the Roadmap section.";
let aboutUsText = "This is the About Us page.";

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg, username) => {
    if (username === OWNER_USERNAME) {
      msg = `[owner] ${msg}`; // Prefix messages from owner
    }
    io.emit("chat message", msg, username);
  });

  socket.on("new update", (newUpdate) => {
    newText = newUpdate;
    io.emit("new update", newUpdate);
  });

  socket.on("update roadmap", (updatedRoadmap) => {
    roadmapText = updatedRoadmap;
    io.emit("update roadmap", updatedRoadmap);
  });

  socket.on("update about us", (updatedAboutUs) => {
    aboutUsText = updatedAboutUs;
    io.emit("update about us", updatedAboutUs);
  });

  socket.on("owner login", (isOwner) => {
    if (isOwner) {
      socket.emit("owner login", true);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
