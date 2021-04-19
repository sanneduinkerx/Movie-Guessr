// source: https://github.com/ju5tu5/barebonechat, followed lecture example 
// make connection to socket
// io not defined in this script but defined in the other socket.io.js script linked in index.html, created by socket.io
const socket = io();
const messages = document.querySelector('section:nth-of-type(2) ul');
const input = document.querySelector('section:nth-of-type(2) form input')
const formChat = document.getElementById('chat');
const img = document.getElementById('moviePoster');

formChat.addEventListener('submit', (e) => {
        // the default, sending a form is now prevented
        e.preventDefault();
    
        //if the input has a value, so if the user types and sends a message then execute function
        if(input.value){
            //emit: uitsturen
            // event named message and give the input.value with it that the user from client side submits
            socket.emit('message', input.value);
            //empty input field
            input.value = '';
        }
})

socket.on('message', (message) => {
    const messageEl = document.createElement('li');
    messageEl.textContent = message;
    messages.appendChild(messageEl);
    messages.scrollTop = messages.scrollHeight;
})

// listens for data event then executes function 
socket.on('data', (data) => {
    //source is img path send with websocket to every client
    img.src =`https://image.tmdb.org/t/p/w500/${data.img_path}`
    console.log(data.title);
})