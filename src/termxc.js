// ENV
var DEV = true;
//SOCKET CONNECTION CHATROOM
var sock = io.connect();
var bodyDOM = document.getElementsByTagName("BODY")[0];
var usernameDOM = document.getElementById("usernameID");
var tokenDOM = document.getElementById("tokenID");
var outputDOM = document.getElementById("outputID");
var inputDOM = document.getElementById("inputID");
var username = "";
var token = "";
var msg = "";
var room_name = "";
// INITIAL
usernameDOM.focus();
toggleShow(tokenDOM);
toggleShow(outputDOM);
toggleShow(inputDOM);
//+++++++++++++++++++++++++++++++++++++
function addLink(from, msg) {
  var breakNODE = document.createElement("BR");
  var anchoreNODE = document.createElement("a");
  anchoreNODE.setAttribute("href", msg);
  anchoreNODE.setAttribute("target", "_blank");
  var textnode = document.createTextNode(decryptedMSG(msg));
  anchoreNODE.appendChild(textnode);
  outputDOM.appendChild(breakNODE);
  outputDOM.appendChild(anchoreNODE);
}
//+++++++++++++++++++++++++++++++++++++
function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
//+++++++++++++++++++++++++++++++++++++
function addYoutubeLink(from, msg) {
  var paraNODE = document.createElement("P");
  paraNODE.style.margin = 0;
  var textnode = document.createTextNode(from + ": " + decryptedMSG(msg));
  paraNODE.appendChild(textnode);
  //++++++++++++++++++++++++
  var youtubeVideoID = youtube_parser(msg);
  var youtubeImageLink =
    "https://img.youtube.com/vi/" + youtubeVideoID + "/0.jpg";
  var anchoreNODE = document.createElement("a");
  anchoreNODE.setAttribute("href", msg);
  anchoreNODE.setAttribute("target", "_blank");
  var imageNode = document.createElement("IMG");
  imageNode.setAttribute("src", youtubeImageLink);
  imageNode.setAttribute("height", 100);
  anchoreNODE.appendChild(imageNode);
  //++++++++++++++++++++++++
  outputDOM.appendChild(paraNODE);
  outputDOM.appendChild(anchoreNODE);
}
//+++++++++++++++++++++++++++++++++++++
function addText(from, msg) {
  var paraNODE = document.createElement("P");
  paraNODE.style.margin = 0;
  var textnode = document.createTextNode(from + ": " + decryptedMSG(msg));
  paraNODE.appendChild(textnode);
  outputDOM.appendChild(paraNODE);
}
//+++++++++++++++++++++++++++++++++++++
function getDataType(msg) {
  if (msg.includes("youtube")) {
    return "youtubeLink";
  } else if (
    msg.includes(".com") ||
    msg.includes(".net") ||
    msg.includes(".org")
  ) {
    return "link";
  } else if (msg.includes("ping:")) {
    return "pingping";
  } else {
    return "text";
  }
}
//+++++++++++++++++++++++++++++++++++++
function addPingPing(from, msg) {
  var paraNODE = document.createElement("P");
  paraNODE.style.margin = 0;
  var textnode = document.createTextNode(from + ": " + decryptedMSG(msg));
  paraNODE.appendChild(textnode);
  outputDOM.appendChild(paraNODE);
  //play ping
  document.getElementById("audio1").play();
  document.getElementById("audio2").play();
}
//+++++++++++++++++++++++++++++++++++++
function pingping(n) {
  var myMusic = new sound("/ping.mp3");
  myMusic.play();
  for (; n < 5; n++) {
    myMusic.play();
    console.log("pingping!");
  }
}
//+++++++++++++++++++++++++++++++++++++
// LISTENER TO SERVER:
//+++++++++++++++++++++++++++++++++++++
sock.on("message_to_client", function ({ from, msg }) {
  //ping for incoming
  // pingping(2);

  logit(
    "LOG: [EVENT=message_to_client] [room_name=" +
      room_name +
      "] [from=" +
      from +
      "] [msg=" +
      msg +
      "]"
  );

  var dataType = getDataType(msg);

  switch (dataType) {
    case "youtubeLink":
      addYoutubeLink(from, msg);
      break;
    case "link":
      addLink(from, msg);
      break;
    case "text":
      addText(from, msg);
      break;
    case "pingping":
      addPingPing(from, msg);
      break;
    default:
      addText(from, msg);
  }
});
//+++++++++++++++++++++++++++++++++++++
// SEND TO SERVER:
//+++++++++++++++++++++++++++++++++++++
function sendToServer(msg, room_name) {
  logit(
    "LOG: [EVENT=message_to_server] [room_name=" +
      room_name +
      "] [from=" +
      username +
      "] [msg=" +
      msg +
      "]"
  );
  sock.emit("message_to_server", { room_name, from: username, msg });
}
//+++++++++++++++++++++++++++++++++++++
function decryptedMSG(value) {
  return value;
}
//+++++++++++++++++++++++++++++++++++++
function logit(log_msg) {
  if (DEV) {
    console.log(log_msg);
  }
}
//+++++++++++++++++++++++++++++++++++++
function encryptedMSG(value) {
  return value;
}
//+++++++++++++++++++++++++++++++++++++
function removeElement(xx) {
  xx.value = "";
  xx.blur();
  toggleShow(xx);
}
//HIDE/SHOW ELEMENTS
function toggleShow(x) {
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//USERNAME GIVEN, HIDE IT AND SHOW TOKEN INPUT
usernameDOM.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    //+++++++++++++++++++++++++++++++++++++
    if (usernameDOM.value != "") {
      username = usernameDOM.value;
      //REMOVE usernameDOM
      removeElement(usernameDOM);
      //SHOW tokenDOM
      toggleShow(tokenDOM);
      tokenDOM.focus();
      //mod inputDOM
      inputDOM.placeholder = "say something " + username;
    } else {
      usernameDOM.placeholder = "admin: what was that?";
      setTimeout(() => {
        usernameDOM.placeholder = "enter username";
      }, 1000);
    }
    //+++++++++++++++++++++++++++++++++++++
  }
});
//TOKEN GIVEN, HIDE IT AND SHOW TERMINAL OUTPUT AND INPUT
tokenDOM.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    //+++++++++++++++++++++++++++++++++++++
    if (tokenDOM.value != "") {
      //SAVE tokenDOM VALUE
      token = tokenDOM.value;
      //CREATE A ROOM IN SEVERSIDE: ROOM
      room_name = token;
      sock.emit("join_room", room_name);
      //REMOVE tokenDOM
      removeElement(tokenDOM);
      //SHOW TERMINAL OUT AND INT
      toggleShow(outputDOM);
      toggleShow(inputDOM);
      inputDOM.focus();
    } else {
      tokenDOM.placeholder = "admin: what was that?";
      setTimeout(() => {
        tokenDOM.placeholder = "enter secret token";
      }, 1000);
    }
    //+++++++++++++++++++++++++++++++++++++
  }
});
//USER GAVE INPUT, APPEND TO OUTPUT TERMINAL + SEND TO SERVER
inputDOM.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    //+++++++++++++++++++++++++++++++++++++
    if (inputDOM.value != "") {
      //SEND TO SERVER
      sendToServer(inputDOM.value, token);
      //RESET INPUT TERMINAL
      inputDOM.value = "";
    } else {
      inputDOM.placeholder = "admin: what was that?";
      setTimeout(() => {
        inputDOM.placeholder = "say something " + username;
      }, 1000);
    }
    //+++++++++++++++++++++++++++++++++++++
  }
});
//+++++++++++++++++++++++++++++++++++++
function makeinputDOMFocus() {
  outputDOM.blur;
  inputDOM.focus();
}
//+++++++++++++++++++++++++++++++++++++ ALWAYS FOCUS TO INPUT
inputDOM.onmouseout = makeinputDOMFocus;
outputDOM.onmouseenter = makeinputDOMFocus;
outputDOM.onclick = makeinputDOMFocus;
bodyDOM.onmouseenter = makeinputDOMFocus;
bodyDOM.onclick = makeinputDOMFocus;
