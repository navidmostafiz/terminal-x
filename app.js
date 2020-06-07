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
        //SENDING MSG FROM SERVER TO CLIENT USING SPECIFIC EVENT NAME = testerEvent
        socket.emit('testerEvent', { description: '\nMSG FROM SERVER TO CLIENT USING SPECIFIC EVENT NAME = testerEvent' });
    }, 4000);

    //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
    socket.on('clientEvent', function (data) {
        console.log(data);
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