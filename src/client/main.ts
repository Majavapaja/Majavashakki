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

import * as React from "React";
import * as ReactDOM from "React-DOM";

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
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  
  var socket = io();

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
  socket.on('login', function (data) {
    console.log(data)
    connected = true;
    // Render welcome and room selection data
    var lobbyTitle = <HTMLElement>document.querySelector("#roomWelcome");
    lobbyTitle.innerHTML = "Hello " + data.username + "! Welcome to Majavashakki. Please, join existing game or create a new one.";
    
    for(var i=0; i < data.rooms.length; i++){
        showRoomInList(data.rooms[i]);
    }

    loginPage.style.display = "none"; // TODO FADE TO MAKE IT PRETTY (CSS OR REACT?)
    loginPage.removeEventListener('click',focusInput);
    currentInput = newRoomInput;
    currentInput.focus();
    roomPage.style.display = "block"; 
  });

/* ROOM SELECTION PAGE MAGIC */
  newRoomInput.addEventListener("keydown", function(event) {
    // Submit on ENTER
    if(event.which === 13) {
      var room = cleanInput(newRoomInput.value.trim());
      if(room) {
        socket.emit("create gameroom", room);
      }
    }
  });

  // Add new room to UI and attach join event
  function showRoomInList(gameroom) {
    var rooms = document.querySelector("#roomList");
    var newRoom = document.createElement("div");
    newRoom.id = gameroom.title;
    newRoom.innerText = gameroom.title;
    newRoom.addEventListener("click",function(event){
        socket.emit("join gameroom", gameroom.title);
    });
    rooms.appendChild(newRoom);
  }

  // Don't show full gamerooms in list
  function hideRoomInList(gameroom) {
    var roomList = document.querySelector("#roomList div#"+gameroom.title) as HTMLElement;
    roomList.style.display = "none";
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
  function cleanInput (input) {
    var el = document.querySelector('<div/>');
    return el.textContent.replace("<","").replace(">","");
  }

  //document.querySelector('.login.page').style.display = 'none'
  //document.querySelector('.game.page').style.display = 'block'
  ReactDOM.render(
    React.createElement(GameView, {pieces: INITIAL_STATE.board, socket: socket}, null),
    document.querySelector('.game.page')
  )

})();


class GameView extends React.Component<any,any> {
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

class Board extends React.Component<any,any> {
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
      this.makeCells()
    )
  }
}
