const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
console.log(__dirname);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user');

    socket.emit('welcome', {
        from:'Admin',
        text: 'Welcome to the chat app!',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('welcome', {
        from:'Admin',
        text: 'New User has joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);-
       io.emit('newMessage', {
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
    /*
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    */
    
    });

    socket.on('disconnect', ()=>{
        console.log('disconnected user');
    });

//end of io
});




server.listen(port, ()=>{
    console.log(`connected to server on ${port}`);
});
