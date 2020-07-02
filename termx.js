"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/termx.html');
});

// server side code: ROOM
io.sockets.on('connection', function (socket) {
    console.log('EVENT=connection');

    //EACH TIME WE WANT TO CREATE A NEW ROOM FROM CLEINT SIDE, EVENT = CREATE
    socket.on('join_room', function (roomName) {
        console.log("EVENT=create & roomName=" + roomName);
        console.log(socket.rooms);
        socket.join(roomName);
    });

    //LISTEN TO ROOMS
    socket.on('message_to_server', function ({roomName, from, msg}) {
        console.log("EVENT=message_to_server & roomName=" + roomName + "& from=" + from + "& msg=" + msg);
        msg = checkText(msg);
        io.in(roomName).emit('message_to_client', {from, msg});
    });

    //A user disconnect from room
    socket.on('disconnect', function () {
        console.log('EVENT=disconnect');
    });

});

http.listen(PORT, function () {
    console.log('TERMINAL-X STARTED ON PORT: ' + PORT);
});

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkText = exports.emojiMap = void 0;

/* eslint-disable linebreak-style */
const emojiMap = {
  'o/': '👋',
  '</3': '💔',
  '<3': '💗',
  '8-D': '😁',
  '8D': '😁',
  ':-D': '😁',
  ':-3': '😁',
  ':3': '😁',
  ':D': '😁',
  'B^D': '😁',
  'X-D': '😁',
  XD: '😁',
  'x-D': '😁',
  xD: '😁',
  ':\')': '😂',
  ':\'-)': '😂',
  ':-))': '😃',
  '8)': '😄',
  ':)': '😊',
  ':-)': '😄',
  ':]': '😄',
  ':^)': '😄',
  ':c)': '😄',
  ':o)': '😄',
  ':}': '😄',
  ':っ)': '😄',
  '0:)': '😇',
  '0:-)': '😇',
  '0:-3': '😇',
  '0:3': '😇',
  '0;^)': '😇',
  'O:-)': '😇',
  '3:)': '😈',
  '3:-)': '😈',
  '}:)': '😈',
  '}:-)': '😈',
  '*)': '😉',
  '*-)': '😉',
  ':-,': '😉',
  ';)': '😉',
  ';-)': '😉',
  ';-]': '😉',
  ';D': '😉',
  ';]': '😉',
  ';^)': '😉',
  ':-|': '😐',
  ':|': '😐',
  ':(': '😒',
  ':-(': '😒',
  ':-<': '😒',
  ':-[': '😒',
  ':-c': '😒',
  ':<': '😒',
  ':[': '😒',
  ':c': '😒',
  ':{': '😒',
  ':っC': '😒',
  '%)': '😖',
  '%-)': '😖',
  ':-P': '😜',
  ':-b': '😜',
  ':-p': '😜',
  ':-Þ': '😜',
  ':-þ': '😜',
  ':P': '😜',
  ':b': '😜',
  ':p': '😜',
  ':Þ': '😜',
  ':þ': '😜',
  ';(': '😜',
  'X-P': '😜',
  XP: '😜',
  'd:': '😜',
  'x-p': '😜',
  xp: '😜',
  ':-||': '😠',
  ':@': '😠',
  ':-.': '😡',
  ':-/': '😡',
  ':/': '😡',
  ':L': '😡',
  ':S': '😡',
  ':\\': '😡',
  ':\'(': '😢',
  ':\'-(': '😢',
  '^5': '😤',
  '^<_<': '😤',
  'o/\\o': '😤',
  '|-O': '😫',
  '|;-)': '😫',
  ':###..': '😰',
  ':-###..': '😰',
  'D-\':': '😱',
  D8: '😱',
  'D:': '😱',
  'D:<': '😱',
  'D;': '😱',
  DX: '😱',
  'v.v': '😱',
  '8-0': '😲',
  ':-O': '😲',
  ':-o': '😲',
  ':O': '😲',
  ':o': '😲',
  'O-O': '😲',
  O_O: '😲',
  O_o: '😲',
  'o-o': '😲',
  o_O: '😲',
  o_o: '😲',
  ':$': '😳',
  '#-)': '😵',
  ':#': '😶',
  ':&': '😶',
  ':-#': '😶',
  ':-&': '😶',
  ':-X': '😶',
  ':X': '😶',
  ':-J': '😼',
  ':*': '😽',
  ':^*': '😽',
  ಠ_ಠ: '🙅',
  '*\\0/*': '🙆',
  '\\o/': '🙆',
  ':>': '😄',
  '>.<': '😡',
  '>:(': '😠',
  '>:)': '😈',
  '>:-)': '😈',
  '>:/': '😡',
  '>:O': '😲',
  '>:P': '😜',
  '>:[': '😒',
  '>:\\': '😡',
  '>;)': '😈',
  '>_>^': '😤',
  '^^': '😊',
  ':sweat': '😅'
};
exports.emojiMap = emojiMap;

const checkText = text => {
  const words = text && text.split(' ');
  const newText = [];

  if (words) {
    words.forEach(word => {
      let w = word;

      if (word in emojiMap) {
        w = emojiMap[word];
      }

      newText.push(w);
    });
  }

  return newText.join(' ');
};

exports.checkText = checkText;