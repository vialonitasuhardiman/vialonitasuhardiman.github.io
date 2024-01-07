// chat.js

const apiEndpoint = 'https://ai.liaobots.work/v1/chat/completions'; // Update with the correct GPT-3.5 Turbo engine endpoint
const apiKey = 'WjzysF1uyIW9Z';

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  appendMessage('user', userInput);

  fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: userInput,
      max_tokens: 4000, // Adjust as needed
      engine: 'gpt-3.5-turbo-1106', // GPT-3.5 Turbo engine
    }),
  })
  .then(response => response.json())
  .then(data => {
    const botResponse = data.choices[0].text.trim();
    appendMessage('bot', botResponse);
  })
  .catch(error => {
    console.error('Error sending message to API:', error);
  });
}

function appendMessage(sender, message) {
  const chatContainer = document.getElementById('chat-container');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  chatContainer.appendChild(messageElement);
}
