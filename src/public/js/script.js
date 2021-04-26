// source: https://github.com/ju5tu5/barebonechat, followed lecture example 
// make connection to socket
// io not defined in this script but defined in the other socket.io.js script linked in index.html, created by socket.io
const socket = io();
const messages = document.querySelector('section:nth-of-type(2) ul');
const input = document.querySelector('section:nth-of-type(2) form input')
const formChat = document.getElementById('chat');
const img = document.getElementById('moviePoster');
const score = document.getElementById('score');

// getting query from url, the display name
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('name');

formChat.addEventListener('submit', (e) => {
        // the default, sending a form is now prevented
        e.preventDefault();
    
        //if the input has a value, so if the user types and sends a message then execute function
        if(input.value){
            //emit: uitsturen
            // event named message and give the input.value with it that the user from client side submits
            // giving message plus display name send to server
            socket.emit('message', {
              username,
              msg: input.value
            });
            //empty input field
            input.value = '';
        }
})

// send typed in username to server
socket.emit('userConnected', username);

// feedback which users are joining
socket.on('userConnected', (username) => {
    const userConnected = document.createElement('p');
    userConnected.textContent = `${username} has joined the game`;
    messages.appendChild(userConnected);
})

// render messages in html
socket.on('message', ({ msg, username }) => {

    const chatBlock = document.createElement('li');
    const displayName = document.createElement('p');
    const messageEl = document.createElement('p');

    // fill message with the name and msg
    displayName.textContent = username;
    messageEl.textContent = msg;

    chatBlock.appendChild(displayName);
    chatBlock.appendChild(messageEl);
    messages.appendChild(chatBlock);
    messages.scrollTop = messages.scrollHeight;
})

//shows an image from the send data
socket.on('movieData', (guessMovie) => {
    //source is img path send with websocket to every client
    console.log(guessMovie)
    img.src =`https://image.tmdb.org/t/p/w500/${guessMovie.img_path}`
    console.log(guessMovie.title);
})

//scoreboard -> completely wrong................
socket.on('scoreBoard', (users) =>{
    users.forEach(user => {
        const userScore = document.createElement('li');
        userScore.textContent = `${user.username} = ${user.score} points`
        console.log(`${user.username} = ${user.score}`);
        // score.appendChild(userScore);
    });
})

//feedback when someone disconnects/leaves game
socket.on('disconnected', (name) => {
        const userDisconnect = document.createElement('p');
        userDisconnect.textContent = `${name} has left the game`;
        messages.appendChild(userDisconnect);
})