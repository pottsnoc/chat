var socket = io();
socket.on('user joined', data => {
    const user = createUserElement(data.id);
    document.querySelector('#root').appendChild(user);
});
socket.on('user left', data => {
    document.querySelector(`#${data.id}`).remove();
});
socket.on('greeting', data => {
    data.payload.forEach(element => {
        const user = createUserElement(element.id)
        document.querySelector('#root').appendChild(user);
    });
});
socket.on('message', data => {
    const chat = document.querySelector('#chat');
    const message = document.createElement('li');
    message.textContent = data.message;
    chat.appendChild(message);
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const field = document.querySelector('#textMessage');
    socket.emit('message', {message: field.value});
    field.value = '';
});

socket.emit('hello', {name: "Vasya", lastName: "Pupkin"});

function createUserElement(id) {
    const user = document.createElement('div');
    user.textContent = `User: ${id}`;
    user.id = id;
    return user;
}