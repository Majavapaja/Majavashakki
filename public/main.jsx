const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')
const $ = require('jquery')

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
    const stateDebug = <pre>{JSON.stringify(this.state, null, 2)}</pre>

    console.log('pieces given to Board', this.state.pieces)
    return (
      <div>
        <Board pieces={this.state.pieces}
               socket={this.props.socket}/>
        {stateDebug}
      </div>
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
          pieceImage = <div className={`piece ${piece.color} ${piece.type}`}></div>
        }

        elements.push(
          <div className={`cell ${isSelected}`}
               onClick={() => this.selectCell(pos)}
               key={pos}>
            {pieceImage}
          </div>
        )
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
    return (
      <div className='board'>
        {this.makeCells()}
        <pre>{JSON.stringify(this.pieceMap, null, 2)}</pre>
      </div>
    )
  }
}
