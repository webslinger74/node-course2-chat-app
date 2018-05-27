const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
console.log(__dirname);


const {generateMessage} = require('./utils/message.js');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user');

    socket.emit('welcome', generateMessage('admin', 'Welcome to the chat app'));
  
    socket.broadcast.emit('welcome', generateMessage('admin','New User has joined'));

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);-
       io.emit('newMessage', generateMessage(message.from,message.text));
       
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
