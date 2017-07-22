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

  // Page selection variables
  var $roomPage = $(".room.page"); // The room selection page
  var $newRoomInput = $roomPage.find("#newRoomInput"); // Next page focus

  // Shared variables
  var $currentInput = $usernameInput.focus(); // Keydown event binding to follow currentInput

  var $gamePage = $(".game.page");
  var $chatPage = $('.chat.page'); // The chatroom page
  

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  
  var socket = io();

  $(window).keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
  });

  function renderRoom(gameroom) {
    var rooms = $("#roomList");
    rooms.append($("<div>").text(gameroom.title));
  }

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
      renderRoom(val);
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

  socket.on("gameroom created", function(gameroom){
    renderRoom(gameroom);
  })

  // Log a message
  function log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
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
        const pieceStr = piece ? `${piece.color} ${piece.type}` : 'empty'
        elements.push(
          React.createElement('div', {className: 'cell'}, `${name} (${pieceStr})`),
        )
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
      type: 'pawn',
      color: 'white',
      position: {
        row: 'b',
        col: '1'
      }
    },
    {
      type: 'pawn',
      color: 'white',
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

