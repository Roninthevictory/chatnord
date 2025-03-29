// Get references to HTML elements
const socket = io();

// Tabs
const tabChat = document.getElementById("tab-chat");
const tabChat2 = document.getElementById("tab-chat2");
const tabAbout = document.getElementById("tab-about");
const tabNew = document.getElementById("tab-new");
const tabRoadmap = document.getElementById("tab-roadmap");
const tabAdmin = document.getElementById("tab-admin");

const contentChat = document.getElementById("content-chat");
const contentChat2 = document.getElementById("content-chat2");
const contentAbout = document.getElementById("content-about");
const contentNew = document.getElementById("content-new");
const contentRoadmap = document.getElementById("content-roadmap");
const contentAdmin = document.getElementById("content-admin");

// Chat Elements
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const messagesContainer = document.getElementById("messages");

// Admin Panel Elements
const adminLoginButton = document.getElementById("admin-login");
const adminUsernameInput = document.getElementById("admin-username");
const adminPasswordInput = document.getElementById("admin-password");
const adminPanel = document.getElementById("admin-panel");
const addUpdateButton = document.getElementById("add-update");
const editRoadmapButton = document.getElementById("edit-roadmap");
const editAboutUsButton = document.getElementById("edit-about-us");
const loginOwnerButton = document.getElementById("login-owner");

// Admin Actions Forms
const addUpdateForm = document.getElementById("add-update-form");
const submitUpdateButton = document.getElementById("submit-update");
const newUpdateText = document.getElementById("new-update-text");

const editRoadmapForm = document.getElementById("edit-roadmap-form");
const submitRoadmapButton = document.getElementById("submit-roadmap");
const roadmapEditText = document.getElementById("roadmap-edit-text");

const editAboutUsForm = document.getElementById("edit-about-us-form");
const submitAboutUsButton = document.getElementById("submit-about-us");
const aboutUsEditText = document.getElementById("about-us-edit-text");

// Admin credentials
const adminUsername = "Chatnordadmin";
const adminPassword = "Chatnord123@!";
let isAdmin = false;

// Handle Tab Switching
const tabs = [tabChat, tabChat2, tabAbout, tabNew, tabRoadmap, tabAdmin];
const contents = [contentChat, contentChat2, contentAbout, contentNew, contentRoadmap, contentAdmin];

function switchTab(activeTabIndex) {
  tabs.forEach((tab, index) => {
    tab.classList.remove("active");
    contents[index].classList.remove("active");
    if (index === activeTabIndex) {
      tab.classList.add("active");
      contents[index].classList.add("active");
    }
  });
}

// Event Listeners for Tabs
tabChat.addEventListener("click", () => switchTab(0));
tabChat2.addEventListener("click", () => switchTab(1));
tabAbout.addEventListener("click", () => switchTab(2));
tabNew.addEventListener("click", () => switchTab(3));
tabRoadmap.addEventListener("click", () => switchTab(4));
tabAdmin.addEventListener("click", () => switchTab(5));

// Set default tab to Chat
switchTab(0);

// Handle Chat Message
sendButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (username && message) {
    socket.emit("chat message", username, message);
    messageInput.value = ""; // Clear message input
  }
});

// Admin Login
adminLoginButton.addEventListener("click", () => {
  if (adminUsernameInput.value === adminUsername && adminPasswordInput.value === adminPassword) {
    isAdmin = true;
    adminPanel.style.display = "block";
    adminUsernameInput.value = "";
    adminPasswordInput.value = "";
  } else {
    alert("Invalid Admin credentials");
  }
});

// Add Update to New
addUpdateButton.addEventListener("click", () => {
  addUpdateForm.style.display = "block";
});

submitUpdateButton.addEventListener("click", () => {
  const newUpdate = newUpdateText.value;
  if (newUpdate) {
    document.getElementById("new-text").textContent = newUpdate;
    addUpdateForm.style.display = "none";
    socket.emit("new update", newUpdate);
  }
});

// Edit Roadmap
editRoadmapButton.addEventListener("click", () => {
  editRoadmapForm.style.display = "block";
  roadmapEditText.value = document.getElementById("roadmap-text").textContent;
});

submitRoadmapButton.addEventListener("click", () => {
  const updatedRoadmap = roadmapEditText.value;
  if (updatedRoadmap) {
    document.getElementById("roadmap-text").textContent = updatedRoadmap;
    editRoadmapForm.style.display = "none";
    socket.emit("update roadmap", updatedRoadmap);
  }
});

// Edit About Us
editAboutUsButton.addEventListener("click", () => {
  editAboutUsForm.style.display = "block";
  aboutUsEditText.value = document.getElementById("about-text").textContent;
});

submitAboutUsButton.addEventListener("click", () => {
  const updatedAboutUs = aboutUsEditText.value;
  if (updatedAboutUs) {
    document.getElementById("about-text").textContent = updatedAboutUs;
    editAboutUsForm.style.display = "none";
    socket.emit("update about us", updatedAboutUs);
  }
});

// Login as Owner
loginOwnerButton.addEventListener("click", () => {
  const ownerUsername = prompt("Enter owner username:");
  const ownerPassword = prompt("Enter owner password:");

  if (ownerUsername === "Ownerchat" && ownerPassword === "Ownerofsite123") {
    socket.emit("owner login", true);
    alert("Logged in as owner. Messages will now have [owner] prefix.");
  } else {
    alert("Invalid owner credentials");
  }
});

// Chat message event
socket.on("chat message", (msg, username) => {
  // Add owner prefix if logged in as owner
  if (username === "Ownerchat") {
    msg = `[owner] ${msg}`;
  }
  const messageElement = document.createElement("div");
  messageElement.textContent = `${username}: ${msg}`;
  messagesContainer.appendChild(messageElement);
});

// Listen for updates to New, Roadmap, and About Us sections
socket.on("new update", (update) => {
  document.getElementById("new-text").textContent = update;
});

socket.on("updated roadmap", (roadmap) => {
  document.getElementById("roadmap-text").textContent = roadmap;
});

socket.on("updated about us", (aboutUs) => {
  document.getElementById("about-text").textContent = aboutUs;
});
