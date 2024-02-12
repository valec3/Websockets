const socket = io('http://localhost:3000');
const form = document.getElementById('form-chat');
const inputUser = document.getElementById('inputUser');
const messagesChat = document.getElementById('messagesChat');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputUser.value) {
        socket.emit('chat message', inputUser.value);
        inputUser.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messagesChat.appendChild(item);
});
