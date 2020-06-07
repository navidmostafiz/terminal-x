var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//+++++++++++++++++++++++++++++++++++++
//SOCKET CONNECTION USING DEFAULT CONNECTION
// io.on('connection', function (socket) {
//     console.log('A user connected');

//     //Send a message when 
//     setTimeout(function () {
//         //SENDING MSG FROM SERVER TO CLIENT USING SPECIFIC EVENT NAME = fromServerEvent
//         socket.emit('fromServerEvent', { msg: 'admin: welcome to the terminal-x.' });
//     }, 2000);

//     //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
//     socket.on('fromClientEvent', function (data) {
//         console.log(data);
//         //sending back to cleint, what was recieved from client
//         socket.emit('fromServerEvent', { msg: data });
//     });

//     socket.on('disconnect', function () {
//         console.log('A user disconnected');
//     });
// });
//+++++++++++++++++++++++++++++++++++++

//SOCKET CONNECTION USING SPECIFIC NAMESPACE
var nsp = io.of('/terminalx_nsp');
nsp.on('connection', function (socket) {
    console.log('someone connected using namespace terminalx_nsp');
    nsp.emit('terminalx_broadcast', 'admin: welcome to the terminal-x.');

    //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
    socket.on('terminalx_broadcast', function (data) {
        console.log("from cleint terminalx_broadcast = " + data);
        //sending back to client, what was recieved from client
        nsp.emit('terminalx_broadcast', data);
    });
});


http.listen(3000, function () {
    console.log('STARTED NODEJS IO SOCKET SERVER. listening on localhost:3000');
});