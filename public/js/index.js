var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    socket.on('welcome', function(welcome){
        console.log(`from: ${welcome.from} --
        ${welcome.text} -- ${welcome.createdAt}`
    )});

});
socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('new message received from server!', message);
});

