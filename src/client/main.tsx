import * as React from "React";
import * as ReactDOM from "React-DOM";
import * as io from "socket.io-client";

import INITIAL_STATE from '../common/initial-state'
import GameView from './gameview'

(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

/* GENERAL VARIABLES */

  // Login variables
  var loginPage = document.querySelector('.login.page') as HTMLElement; // The login page
  var usernameInput = document.querySelector(".login.page .usernameInput") as HTMLInputElement; // Input for username

  // Lobby variables
  var roomPage = document.querySelector(".room.page") as HTMLElement; // The room selection page
  var newRoomInput = document.querySelector(".room.page #newRoomInput") as HTMLInputElement; // Next page focus

  // Game variables
  var gamePage = document.querySelector(".game.page") as HTMLElement;

  // Shared variables
  var currentInput = usernameInput; // Keydown event binding to follow currentInput
  currentInput.focus();

  // Prompt for setting a username
  var typing = false;
  var lastTypingTime;
  
  const socket: SocketIOClient.Socket = io();

/* LOGIN PAGE MAGIC */
  usernameInput.addEventListener("keydown", function(event){
// Submit on ENTER
    if(event.which === 13) {
      var username = cleanInput(usernameInput.value.trim());
      if (username) {
        socket.emit('new user', username);
      }
    }
  });

  // Focus input when clicking anywhere on login page // TODO do we need this shit?
  function focusInput(event){currentInput.focus();}
  loginPage.addEventListener("click", focusInput);

  // User has logged in. Switch the page to room selection.
  socket.on('login', function (username: string) {
    // Render welcome and room selection data
    var lobbyTitle = document.querySelector("#roomWelcome") as HTMLElement;
    lobbyTitle.innerHTML = "Hello " + username + "! Welcome to Majavashakki. Please, join existing game or create a new one.";
    loginPage.style.display = "none"; // TODO FADE TO MAKE IT PRETTY (CSS OR REACT?)
    loginPage.removeEventListener('click', focusInput);
    currentInput = newRoomInput;
    currentInput.focus();
    roomPage.style.display = "block";
    socket.emit("fetch-games");
  });

  socket.on("update-games", function(gameRooms: Array<string>) {
    for(let i=0; i < gameRooms.length; i++){
        showRoomInList(gameRooms[i]);
    }
  });

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
    <GameView pieces={INITIAL_STATE} socket={socket} />,
    document.querySelector('.game.page')
  )

})();
