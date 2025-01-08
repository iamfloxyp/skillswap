// Global Variables
const chatMessages = document.getElementById('chatMessages');
const chatMessageInput = document.getElementById('chatMessageInput');
const chatSendBtn = document.getElementById('chatSendBtn');

let editingMessageId = null; // To track if we're editing a message
const STORAGE_KEY = 'chatMessages'; // Local Storage key

// Track the last date shown
let lastDisplayedDate = null;

// Load messages when the page loads
document.addEventListener('DOMContentLoaded', loadMessages);

// Send message on button click
chatSendBtn.addEventListener('click', handleSendOrUpdate);

// Send message on "Enter" key
chatMessageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSendOrUpdate();
  }
});

// Load messages from localStorage
function loadMessages() {
  chatMessages.innerHTML = '';
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Reset the last displayed date
  lastDisplayedDate = null;

  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp);
    const dateLabel = formatDate(msgDate);

    // Insert a date divider only if the date changes
    if (dateLabel !== lastDisplayedDate) {
      insertDateDivider(dateLabel);
      lastDisplayedDate = dateLabel;
    }

    displayMessage(msg);
  });
}

// Handle sending or updating a message
function handleSendOrUpdate() {
  const text = chatMessageInput.value.trim();
  if (!text) return;

  if (editingMessageId) {
    updateMessage(editingMessageId, text);
  } else {
    sendMessage(text);
  }
}

// Send a new message
function sendMessage(text) {
  const now = new Date();
  const message = {
    id: Date.now(),
    text,
    timestamp: now.getTime(),
    sent: true, // Flag for styling (sent/received)
  };

  const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  messages.push(message);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

  const dateLabel = formatDate(now);

  // Insert a date divider only if the date changes
  if (dateLabel !== lastDisplayedDate) {
    insertDateDivider(dateLabel);
    lastDisplayedDate = dateLabel;
  }

  displayMessage(message);
  chatMessageInput.value = '';
}

// Display a message in the chat
function displayMessage(msg) {
  const { id, text, timestamp, sent } = msg;

  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  if (sent) msgDiv.classList.add('sent');
  msgDiv.dataset.id = id;

  // Message content
  msgDiv.innerHTML = `
    ${text}
    <span class="message-time">${formatTime(new Date(timestamp))}</span>
  `;

  // Message actions (hover menu)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('message-actions');

  // Copy button
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';
  copyBtn.addEventListener('click', () => copyMessage(text));

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editMessage(id, text));

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteMessage(id));

  actionsDiv.appendChild(copyBtn);
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  msgDiv.appendChild(actionsDiv);

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Insert a date divider into the chat
function insertDateDivider(date) {
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('message-date');
  dateDiv.textContent = date;
  chatMessages.appendChild(dateDiv);
}

// Update an existing message
function updateMessage(id, newText) {
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const message = messages.find((m) => m.id === id);
  if (message) {
    message.text = newText;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

    const msgDiv = document.querySelector(`.message[data-id="${id}"]`);
    if (msgDiv) {
      msgDiv.firstChild.textContent = newText;
    }
  }
  chatMessageInput.value = '';
  editingMessageId = null;
}

// Format a date for the date divider
// Example: "Today", "Yesterday", "Jan 10, 2025"
function formatDate(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today - 86400000);

  if (date >= today) return 'Today';
  if (date >= yesterday) return 'Yesterday';
  return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
}

// Format the time for display under each message
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Copy message text
function copyMessage(text) {
  navigator.clipboard.writeText(text).then(() => alert('Copied!'));
}

// Edit a message
function editMessage(id, text) {
  editingMessageId = id;
  chatMessageInput.value = text;
  chatMessageInput.focus();
}

// Delete a message
function deleteMessage(id) {
  let messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const messageIndex = messages.findIndex((msg) => msg.id === id);
  if (messageIndex !== -1) {
    const msg = messages[messageIndex];

    // Remove from messages
    messages.splice(messageIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

    // Remove the message from the DOM
    const msgDiv = document.querySelector(`.message[data-id="${id}"]`);
    if (msgDiv) msgDiv.remove();

    // Check if other messages exist for this date
    const sameDateMessages = messages.filter(
      (m) => formatDate(new Date(m.timestamp)) === formatDate(new Date(msg.timestamp))
    );

    // If no messages remain for this date, remove the date divider
    if (sameDateMessages.length === 0) {
      const dateDiv = [...chatMessages.querySelectorAll('.message-date')].find(
        (d) => d.textContent === formatDate(new Date(msg.timestamp))
      );
      if (dateDiv) dateDiv.remove();
    }
  }
}
