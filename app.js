var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//SOCKET CONNECTION USING DEFAULT CONNECTION
io.on('connection', function (socket) {
    console.log('A user connected');

    //Send a message when 
    setTimeout(function () {
        //SENDING MSG FROM SERVER TO CLIENT USING SPECIFIC EVENT NAME = fromServerEvent
        socket.emit('fromServerEvent', { description: 'admin: welcome to the terminal-x.' });
    }, 2000);

    //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
    socket.on('fromClientEvent', function (data) {
        console.log(data);
        //sending back to cleint, what was recieved from client
        socket.emit('fromServerEvent', { description: data });
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

//SOCKET CONNECTION USING SPECIFIC NAMESPACE
// var nsp = io.of('/my-namespace');
// nsp.on('connection', function (socket) {
//     console.log('someone connected using namesapce');
//     nsp.emit('hi', 'Hello everyone! you are connected to namespcase, this is broadcoast');
// });


http.listen(3000, function () {
    console.log('listening on localhost:3000');
});