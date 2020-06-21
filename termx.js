"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT | 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/termx.html');
});

// server side code: ROOM
io.sockets.on('connection', function (socket) {
    console.log('EVENT=connection');

    //EACH TIME WE WANT TO CREATE A NEW ROOM FROM CLEINT SIDE, EVENT = CREATE
    socket.on('join_room', function (room) {
        console.log("EVENT=create & ROOM=" + room);
        console.log(socket.rooms);
        socket.join(room);
    });

    //LISTEN TO ROOMS
    socket.on('message_to_server', function ({troom, tunValue, msg}) {
        console.log("EVENT=message_to_server & room=" + troom + "& username=" + tunValue + "& msg=" + msg);
        io.in(troom).emit('message_to_client', msg);
    });

    //A user disconnect from room
    socket.on('disconnect', function () {
        console.log('EVENT=disconnect');
    });

});

http.listen(PORT, function () {
    console.log('TERMINAL-X STARTED ON PORT: ' + PORT);
});