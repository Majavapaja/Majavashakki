const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')
const $ = require('jquery')

const {GameView} = require('./game')
const {INITIAL_STATE} = require('./initial-state')


$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

/* GENERAL VARIABLES */

  // Login variables
  var $loginPage = $('.login.page'); // The login page
  var $usernameInput = $loginPage.find(".usernameInput"); // Input for username

  // Lobby variables
  var $roomPage = $(".room.page"); // The room selection page
  var $newRoomInput = $roomPage.find("#newRoomInput"); // Next page focus

  // Game variables
  var $gamePage = $(".game.page");

  // Shared variables
  var $currentInput = $usernameInput.focus(); // Keydown event binding to follow currentInput

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  
  var socket = io();

/* LOGIN PAGE MAGIC */
  $usernameInput.keydown(function(event){
    // Submit on ENTER
    if(event.which === 13) {
      var username = cleanInput($usernameInput.val().trim());
      if (username) {
        socket.emit('new user', username);
      }
    }
  });

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // User has logged in. Switch the page to room selection.
  socket.on('login', function (data) {
    console.log(data)
    connected = true;
    // Render welcome and room selection data
    $("#roomWelcome").text("Hello " + data.username + "! Welcome to Majavashakki. Please, join existing game or create a new one.");
    
    $.each(data.rooms, function(i, val){
      showRoomInList(val);
    });

    $loginPage.fadeOut();
    $loginPage.off('click');
    $currentInput = $newRoomInput.focus();

    $roomPage.show(); 
  });

/* ROOM SELECTION PAGE MAGIC */
  $newRoomInput.keydown(function(event) {
    // Submit on ENTER
    if(event.which === 13) {
      var room = cleanInput($newRoomInput.val().trim());
      if(room) {
        socket.emit("create gameroom", room);
      }
    }
  });

  // Add new room to UI and attach join event
  function showRoomInList(gameroom) {
    var rooms = $("#roomList");
    var newRoom = $("<div id='"+gameroom.title+"'>").text(gameroom.title);
    newRoom.click(function(){
      socket.emit("join gameroom", gameroom.title);
    });
    rooms.append(newRoom);
  }

  // Don't show full gamerooms in list
  function hideRoomInList(gameroom) {
    $("#roomList div#"+gameroom.title).hide();
  };

  socket.on("gameroom created", function(gameroom){
    showRoomInList(gameroom);
  });

  // Lobby socket event
  socket.on("gameroom full", function(gameroom) {
    hideRoomInList(gameroom);
  });

  // Gameroom socket event - 2 player joined and game starts
  socket.on("game started", function(gameroom) {   
    console.log("derp");
  });

  socket.on("game joined", function(gameroom) {
    $currentInput = null;
    $roomPage.fadeOut();
    $gamePage.show();
  });

/* GENERIC MAGIC */
  $(window).keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if ($currentInput != null && !(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
  });

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  ReactDOM.render(
    <GameView pieces={INITIAL_STATE.board} socket={socket}/>,
    document.querySelector('.game.page')
  )

});


