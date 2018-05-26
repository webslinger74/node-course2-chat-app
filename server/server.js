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

    socket.on('disconnect', ()=>{
        console.log('disconnected user');
    });

    socket.emit('newMessage', {
        from:"stevie server",
        text:"did you get this",
        createdAt: 123
    });

    socket.on('createMessage', (newMessage)=>{
        console.log('createMessage', newMessage);
    })



//end of io
});




server.listen(port, ()=>{
    console.log(`connected to server on ${port}`);
});
