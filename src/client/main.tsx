import * as React from "React";
import * as ReactDOM from "React-DOM";
import * as io from "socket.io-client";

import INITIAL_STATE from '../common/initial-state';
import GameView from './gameview';
import LoginView from './LoginView';

(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

/* GENERAL VARIABLES */

  // Lobby variables
  var roomPage = document.querySelector(".room.page") as HTMLElement; // The room selection page
  var newRoomInput = document.querySelector(".room.page #newRoomInput") as HTMLInputElement; // Next page focus

  // Game variables
  var gamePage = document.querySelector(".game.page") as HTMLElement;

  // Shared variables
  var currentInput; //usernameInput; // Keydown event binding to follow currentInput
  //currentInput.focus();
  
  const socket: SocketIOClient.Socket = io();

/* ROOM SELECTION PAGE MAGIC */
  newRoomInput.addEventListener("keydown", function(event) {
    // Submit on ENTER
    if(event.which === 13) {
      var room = cleanInput(newRoomInput.value.trim());
      if(room) {
        socket.emit("create-game", room);
      }
    }
  });

  // Add new room to UI and attach join event
  function showRoomInList(roomTitle: string) {
    var rooms = document.querySelector("#roomList");
    var newRoom = document.createElement("div");
    newRoom.id = roomTitle;
    newRoom.innerText = roomTitle;
    newRoom.addEventListener("click",function(event){
        socket.emit("join-game", roomTitle);
    });
    rooms.appendChild(newRoom);
  }

  // Don't show full gamerooms in list
  function hideRoomInList(gameroom) {
    var roomList = document.querySelector("#roomList div#"+gameroom.title) as HTMLElement;
    roomList.style.display = "none";
  };

  socket.on("game-created", function(roomTitle){
    showRoomInList(roomTitle);
  });

  // Lobby socket event
  socket.on("game-full", function(gameroom) {
    hideRoomInList(gameroom);
  });

  socket.on("game-joined", function() {
    currentInput = null;
    roomPage.style.display = "none"; //TODO FADE TO MAKE IT PRETTY PLZ (CSS or React?)
    gamePage.style.display = "block";
  });

/* GENERIC MAGIC */
  window.addEventListener("keydown", function (event) {
    // Auto-focus the current input when a key is typed
    if (currentInput != null && !(event.ctrlKey || event.metaKey || event.altKey)) {
      currentInput.focus();
    }
  });

  // Prevents input from having injected markup - xD mikä tän tunkun pointti on? TODO poistetaan tämmöset turhakkeet?
  function cleanInput (input: string) {
    return input.replace("<","").replace(">","");
  }

  ReactDOM.render(
    <LoginView  socket={socket} />,
    document.querySelector(".login.page")
  )

  ReactDOM.render(
    <GameView pieces={INITIAL_STATE} socket={socket} />,
    document.querySelector('.game.page')
  )

})();
