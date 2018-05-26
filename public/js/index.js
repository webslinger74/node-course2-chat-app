var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createMessage', {
        from:"webble@gmail.com",
        text:"ive joined the chat room"
    });



});
socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('new message received from server!', message);
});

