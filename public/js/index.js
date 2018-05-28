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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(message){
        console.log(message);
    });
});
