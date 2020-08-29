var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT | 3000

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/termx.html');
});


// //SOCKET CONNECTION USING SPECIFIC NAMESPACE
var nsp = io.of('/terminalx_nsp');
nsp.on('connection', function (socket) {
    console.log('LOG: Client connected using namespace terminalx_nsp');
    nsp.emit('terminalx_broadcast', 'admin: you are connected to terminal-x.');

    //RECIEVE MSG FROM CLIENT TO SERVER USING SPECIFIC EVENT NAME = clientEvent
    socket.on('terminalx_broadcast', function (data) {
        console.log("from cleint terminalx_broadcast = " + data);
        //sending back to client, what was recieved from client
        nsp.emit('terminalx_broadcast', data);
    });
});


http.listen(PORT, function () {
    console.log('TERMINAL-X STARTED ON PORT: ' + PORT);
});