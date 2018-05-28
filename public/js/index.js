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

socket.on('newLocationMessage', function(location){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current location</a>')
    li.text(`${location.from}: `);
    a.attr('href', location.url);
    li.append(a);
    jQuery('#messages').append(li);

});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function (){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }

    locationButton.attr('disabled', "disabled").text('Sending location...');


    navigator.geolocation.getCurrentPosition( function(position) {
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    });
});