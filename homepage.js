const socket = io('https://chat-server-adlv.onrender.com');

const getName = async () => {

    var userName = sessionStorage.getItem('name');

    socket.emit('new_user',userName);

    var user_name = document.getElementById('name');
    user_name.innerText = `Welcome ${userName} !`;

}

getName();

const addToChat = (message,name,position) => {
    var div = document.createElement('div');

    var nameContent = document. createElement('p');
    nameContent.textContent = name;
    nameContent.classList.add('message_name');
    
    var messageContent = document.createElement('p');
    messageContent.textContent = message;
    messageContent.classList.add('message_text');

    div.appendChild(nameContent);
    div.appendChild(messageContent);
    div.classList.add('message',position);

    chatContainer.appendChild(div);
}


const addToChat2 = (name,status) => {
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.textContent = `${name} ${status == 'disconnect' ? 'left' : 'joined'} the chat`;
    div.appendChild(p);
    

    if (status == 'joined'){
        div.classList.add('message','center','joined');
    }
    else {
        div.classList.add('message','center','disconnect');
    }

    chatContainer.appendChild(div);
}


const chatContainer = document.getElementById('chat_container');



const sendMsgBtn = document.getElementById('send_btn');
sendMsgBtn.addEventListener('click',(e) => {
    e.preventDefault();

    const message = document.getElementById('message_box');
    if (message.value == ''){
        alert('Please enter a message to send');
        return;
    }

    addToChat(message.value,'You','right');
    socket.emit('send_msg',message.value);
    message.value = '';

})

socket.on('user_joined',(name) => {
    
    addToChat2(name,'joined');

    var audio = new Audio('user_joined.mp3');
    audio.play();
})

socket.on('receive_msg',(message,name) => {
    addToChat(message,name,'left');

    var audio = new Audio('message_sent.mp3');
    audio.play();
})

socket.on('user_disconnected',(name) => {
    var audio = new Audio('user_left.mp3');
    audio.play();
    addToChat2(name,'disconnect');
})