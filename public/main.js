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

});

  

class GameView extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = props.state
    this.setState(props.state)
  }

  render() {
    const stateDebug = React.createElement('pre', null, JSON.stringify(this.state, null, 2))

    return React.createElement('div', null,
      React.createElement(Board, {board: this.state.board}),
      stateDebug
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.pieceMap = props.board.reduce((map, piece) => {
      const pos = piece.position.row + piece.position.col
      map[pos] = piece
      return map
    }, {})
  }

  cellName(x, y) {
    return "ABCDEFGH"[x] + y
  }

  makeCells() {
    console.log(this.pieceMap)
    const elements = []
    for (var y = 8; y > 0; y--) {
      for (var x = 0; x < 8; x++) {
        const name = this.cellName(x, y)
        const piece = this.pieceMap[name.toLowerCase()]

        let pieceImage = null
        if (piece) {
          const className = `piece ${piece.color} ${piece.type}`
          pieceImage = React.createElement('div', {className: className})
        }

        elements.push(React.createElement('div', {className: 'cell'}, pieceImage))
      }
    }
    return elements
  }

  render() {
    const board = this.props.board

    return React.createElement('div', {className: 'board'},
      this.makeCells(),
      React.createElement('pre', null, JSON.stringify(this.pieceMap, null, 2))
    )
  }
}

const INITIAL_STATE = {
  board: [
    {
      type: 'pawn',
      color: 'white',
      position: {
        row: 'b',
        col: '3'
      }
    },
    {
      type: 'rook',
      color: 'black',
      position: {
        row: 'b',
        col: '1'
      }
    },
    {
      type: 'king',
      color: 'black',
      position: {
        row: 'b',
        col: '2'
      }
    },
    {
      type: 'pawn',
      color: 'white',
      position: {
        row: 'b',
        col: '4'
      }
    }
  ],
}

window.onload = () => {
  //document.querySelector('.login.page').style.display = 'none'
  //document.querySelector('.game.page').style.display = 'block'
  ReactDOM.render(
    React.createElement(GameView, {state: INITIAL_STATE}, null),
    document.querySelector('.game.page')
  )
}

