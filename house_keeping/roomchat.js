var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT | 3000

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/termx.html');
});


// // //SOCKET CONNECTION USING SPECIFIC NAMESPACE
// var nsp = io.of('/terminalx_nsp');

// nsp.on('connection', function (socket) {
//     //***************************
//     //EACH TIME A CLEINT JOINS TO THIS NAMESPACE< GIVE THEM A MESSAGE FORM SERVER
//     console.log('LOG: Client connected using namespace terminalx_nsp');
//     nsp.emit('terminalx_broadcast', 'admin: A user connected to terminal-x.');

//     //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
//     socket.on('terminalx_broadcast', function (data) {
//         console.log("from cleint terminalx_broadcast = " + data);
//         //sending back to client, what was recieved from client
//         nsp.emit('terminalx_broadcast', data);
//     });
//     //***************************
// });



// var roomName = ""
// // server side code
// var nsp = io.of('/terminalx_nsp');

// // handle incoming connections from clients
// nsp.on('connection', function (socket) {
//     //EACH TIME A CLEINT JOINS TO THIS NAMESPACE< GIVE THEM A MESSAGE FORM SERVER
//     console.log('LOG: Client connected using namespace terminalx_nsp');
//     nsp.emit('terminalx_broadcast', 'admin: A user connected to terminal-x.');


//     // once a client has connected, we expect to get a ping from them saying what room they want to join
//     socket.on('room', function (room) {
//         roomName = room;
//         socket.join(room);
//     });

//     //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = terminalx_broadcast
//     socket.on('terminalx_broadcast', function (data) {
//         console.log("from cleint terminalx_broadcast = " + data);
//         //sending back to client, what was recieved from client
//         nsp.emit('terminalx_broadcast', data);
//     });

//     //RCV MSG FROM  ONLY GIVEN ROOM
//     socket.on('message', function (data) {
//         console.log("from cleint message = " + data);
//         //sending back to client in that room
//         io.sockets.in(room).emit('message', 'what is going on, party people?');
//     });


// });


// server side code: ROOM
io.sockets.on('connection', function (socket) {
    console.log('EVENT=connection');

    //EACH TIME WE WANT TO CREATE A NEW ROOM FROM CLEINT SIDE, EVENT = CREATE
    socket.on('join_room', function (room) {
        console.log("EVENT=create & ROOM=" + room + " & ALL_ROOMS=" + socket.rooms.count);
        console.log(socket.rooms);

        socket.join(room);
    });

    //LISTEN TO ROOMS
    socket.on('message_to_server', function ({troom, tunValue, msg}) {
        console.log("EVENT=message_to_server & room=" + troom + "& username=" + tunValue + "& msg=" + msg);
        //broadcast to all clients, except sender
        // socket.broadcast.to(troom).emit('message_to_client', msg); //WORKS
        //broadcast to all clients + sender
        io.in(troom).emit('message_to_client', msg);
    });

    //A user disconnect from room
    socket.on('disconnect', function () {
        console.log('EVENT=disconnect');
    });

});



// io.on('connect', onConnect);

// function onConnect(socket) {

//     // sending to the client
//     socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

//     // sending to all clients except sender
//     socket.broadcast.emit('broadcast', 'hello friends!');

//     // sending to all clients in 'game' room except sender
//     socket.to('game').emit('nice game', "let's play a game");

//     // sending to all clients in 'game1' and/or in 'game2' room, except sender
//     socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

//     // sending to all clients in 'game' room, including sender
//     io.in('game').emit('big-announcement', 'the game will start soon');

//     // sending to all clients in namespace 'myNamespace', including sender
//     io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

//     // sending to a specific room in a specific namespace, including sender
//     io.of('myNamespace').to('room').emit('event', 'message');

//     // sending to individual socketid (private message)
//     io.to(socketId).emit('hey', 'I just met you');

//     // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
//     // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

//     // sending with acknowledgement
//     socket.emit('question', 'do you think so?', function (answer) { });

//     // sending without compression
//     socket.compress(false).emit('uncompressed', "that's rough");

//     // sending a message that might be dropped if the client is not ready to receive messages
//     socket.volatile.emit('maybe', 'do you really need it?');

//     // specifying whether the data to send has binary data
//     socket.binary(false).emit('what', 'I have no binaries!');

//     // sending to all clients on this node (when using multiple nodes)
//     io.local.emit('hi', 'my lovely babies');

//     // sending to all connected clients
//     io.emit('an event sent to all connected clients');

// };



http.listen(PORT, function () {
    console.log('TERMINAL-X STARTED ON PORT: ' + PORT);
});