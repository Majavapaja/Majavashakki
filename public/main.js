const INITIAL_STATE = 
 {
     "board": [
        {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "a"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "b"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "c"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "d"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "e"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "f"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "g"
            }
        }, {
            "type": "pawn",
            "color": "white",
            "position": {
                "row": "7",
                "col": "h"
            }
        }, {
            "type": "rook",
            "color": "white",
            "position": {
                "row": "8",
                "col": "a"
            }
        }, {
            "type": "knight",
            "color": "white",
            "position": {
                "row": "8",
                "col": "b"
            }
        }, {
            "type": "bishop",
            "color": "white",
            "position": {
                "row": "8",
                "col": "c"
            }
        }, {
            "type": "queen",
            "color": "white",
            "position": {
                "row": "8",
                "col": "d"
            }
        }, {
            "type": "king",
            "color": "white",
            "position": {
                "row": "8",
                "col": "e"
            }
        }, {
            "type": "bishop",
            "color": "white",
            "position": {
                "row": "8",
                "col": "f"
            }
        }, {
            "type": "bishop",
            "color": "white",
            "position": {
                "row": "8",
                "col": "g"
            }
        }, {
            "type": "rook",
            "color": "white",
            "position": {
                "row": "8",
                "col": "h"
            }
        },


        {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "a"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "b"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "c"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "d"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "e"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "f"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "g"
            }
        }, {
            "type": "pawn",
            "color": "black",
            "position": {
                "row": "2",
                "col": "h"
            }
        }, {
            "type": "rook",
            "color": "black",
            "position": {
                "row": "1",
                "col": "a"
            }
        }, {
            "type": "knight",
            "color": "black",
            "position": {
                "row": "1",
                "col": "b"
            }
        }, {
            "type": "bishop",
            "color": "black",
            "position": {
                "row": "1",
                "col": "c"
            }
        }, {
            "type": "queen",
            "color": "black",
            "position": {
                "row": "1",
                "col": "d"
            }
        }, {
            "type": "king",
            "color": "black",
            "position": {
                "row": "1",
                "col": "e"
            }
        }, {
            "type": "bishop",
            "color": "black",
            "position": {
                "row": "1",
                "col": "f"
            }
        }, {
            "type": "bishop",
            "color": "black",
            "position": {
                "row": "1",
                "col": "g"
            }
        }, {
            "type": "rook",
            "color": "black",
            "position": {
                "row": "1",
                "col": "h"
            }
        }
    ]
 }


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
    console.log(data)
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

  //document.querySelector('.login.page').style.display = 'none'
  //document.querySelector('.game.page').style.display = 'block'
  ReactDOM.render(
    React.createElement(GameView, {pieces: INITIAL_STATE.board, socket: socket}, null),
    document.querySelector('.game.page')
  )
});

class GameView extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({pieces: this.props.pieces})
    this.props.socket.on('move_result', room => this.onMoveResult(room))
  }

  onMoveResult(room) {
    console.log('onMoveResult', room.gameState.board)
    this.setState({pieces: room.gameState.board})
  }

  render() {
    console.log('GameView.render')
    const stateDebug = React.createElement('pre', null, JSON.stringify(this.state, null, 2))

    console.log('pieces given to Board', this.state.pieces)
    return React.createElement('div', null,
      React.createElement(Board, {
        pieces: this.state.pieces,
        socket: this.props.socket,
      }),
      stateDebug
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCell: undefined
    }
  }

  getInitialState() {
  }

  cellName(x, y) {
    return "abcdefgh"[x] + String(y)
  }

  makePieceMap() {
    return this.props.pieces.reduce((map, piece) => {
      const pos = piece.position.col + piece.position.row
      map[pos] = piece
      return map
    }, {})
  }
  
  makeCells() {
    const pieceMap = this.makePieceMap()
    const elements = []
    for (var y = 8; y > 0; y--) {
      for (var x = 0; x < 8; x++) {
        const pos = this.cellName(x, y)
        const piece = pieceMap[pos.toLowerCase()]
        const isSelected = this.state.selectedCell == pos ? 'selected' : ''

        let pieceImage = null
        if (piece) {
          const className = `piece ${piece.color} ${piece.type} `
          pieceImage = React.createElement('div', {
            className: className,
          })
        }

        elements.push(React.createElement('div', {
          className: `cell ${isSelected}`,
          onClick: () => this.selectCell(pos),
        }, pieceImage))
      }
    }
    return elements
  }

  posToJson(pos) {
    return {
      col: pos.charAt(0),
      row: pos.charAt(1),
    }
  }

  selectCell(pos) {
    if (this.state.selectedCell) {
      const movement = {
        from: this.posToJson(this.state.selectedCell),
        dest: this.posToJson(pos),
      }
      this.props.socket.emit('move', movement)

      // TODO Mark move done so we don't send multiples

      this.setState({selectedCell: undefined})
    } else {
      console.log(`selected piece at ${pos}`)
      this.setState({selectedCell: pos})
    }
  }

  render() {
    console.log('Board.render', this.props)
    return React.createElement('div', {className: 'board'},
      this.makeCells(),
      React.createElement('pre', null, JSON.stringify(this.pieceMap, null, 2))
    )
  }
}
