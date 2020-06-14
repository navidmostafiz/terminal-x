var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/broadcast', (req, res) => {
    res.sendFile(__dirname + '/index_broadcast.html');
    // //SOCKET CONNECTION USING SPECIFIC NAMESPACE
    var nsp = io.of('/terminalx_nsp');
    nsp.on('connection', function (socket) {
        console.log('someone connected using namespace terminalx_nsp');
        nsp.emit('terminalx_broadcast', 'admin: connected to terminal-x.');

        //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
        socket.on('terminalx_broadcast', function (data) {
            console.log("from cleint terminalx_broadcast = " + data);
            //sending back to client, what was recieved from client
            nsp.emit('terminalx_broadcast', data);
        });
    });


});

app.get('/single', (req, res) => {
    res.sendFile(__dirname + '/index_single.html');

    //SOCKET CONNECTION USING DEFAULT CONNECTION
    io.on('connection', function (socket) {
        console.log('A user connected');

        //Send a message when 
        setTimeout(function () {
            //SENDING MSG FROM SERVER TO CLIENT USING SPECIFIC EVENT NAME = fromServerEvent
            socket.emit('fromServerEvent', 'admin: welcome to the terminal-x.');
        }, 2000);

        //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
        socket.on('fromClientEvent', function (data) {
            console.log(data);
            //sending back to cleint, what was recieved from client
            socket.emit('fromServerEvent', data);
        });

        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    });
});

http.listen(80, function () {
    console.log('STARTED NODEJS IO SOCKET SERVER. listening on localhost:3000');
});