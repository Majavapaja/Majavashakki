"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INITIAL_STATE = {
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
};
const React = require("React");
const ReactDOM = require("React-DOM");
(function () {
    var FADE_TIME = 150;
    var TYPING_TIMER_LENGTH = 400;
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];
    var loginPage = document.querySelector('.login.page');
    var usernameInput = document.querySelector(".login.page .usernameInput");
    var roomPage = document.querySelector(".room.page");
    var newRoomInput = document.querySelector(".room.page #newRoomInput");
    var gamePage = document.querySelector(".game.page");
    var currentInput = usernameInput;
    currentInput.focus();
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var socket = io();
    usernameInput.addEventListener("keydown", function (event) {
        if (event.which === 13) {
            var username = cleanInput(usernameInput.value.trim());
            if (username) {
                socket.emit('new user', username);
            }
        }
    });
    function focusInput(event) { currentInput.focus(); }
    loginPage.addEventListener("click", focusInput);
    socket.on('login', function (data) {
        console.log(data);
        connected = true;
        var lobbyTitle = document.querySelector("#roomWelcome");
        lobbyTitle.innerHTML = "Hello " + data.username + "! Welcome to Majavashakki. Please, join existing game or create a new one.";
        for (var i = 0; i < data.rooms.length; i++) {
            showRoomInList(data.rooms[i]);
        }
        loginPage.style.display = "none";
        loginPage.removeEventListener('click', focusInput);
        currentInput = newRoomInput;
        currentInput.focus();
        roomPage.style.display = "block";
    });
    newRoomInput.addEventListener("keydown", function (event) {
        if (event.which === 13) {
            var room = cleanInput(newRoomInput.value.trim());
            if (room) {
                socket.emit("create gameroom", room);
            }
        }
    });
    function showRoomInList(gameroom) {
        var rooms = document.querySelector("#roomList");
        var newRoom = document.createElement("div");
        newRoom.id = gameroom.title;
        newRoom.innerText = gameroom.title;
        newRoom.addEventListener("click", function (event) {
            socket.emit("join gameroom", gameroom.title);
        });
        rooms.appendChild(newRoom);
    }
    function hideRoomInList(gameroom) {
        var roomList = document.querySelector("#roomList div#" + gameroom.title);
        roomList.style.display = "none";
    }
    ;
    socket.on("gameroom created", function (gameroom) {
        showRoomInList(gameroom);
    });
    socket.on("gameroom full", function (gameroom) {
        hideRoomInList(gameroom);
    });
    socket.on("game started", function (gameroom) {
        console.log("derp");
    });
    socket.on("game joined", function (gameroom) {
        currentInput = null;
        roomPage.style.display = "none";
        gamePage.style.display = "block";
    });
    window.addEventListener("keydown", function (event) {
        if (currentInput != null && !(event.ctrlKey || event.metaKey || event.altKey)) {
            currentInput.focus();
        }
    });
    function cleanInput(input) {
        var el = document.querySelector('<div/>');
        return el.textContent.replace("<", "").replace(">", "");
    }
    ReactDOM.render(React.createElement(GameView, { pieces: INITIAL_STATE.board, socket: socket }, null), document.querySelector('.game.page'));
})();
class GameView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({ pieces: this.props.pieces });
        this.props.socket.on('move_result', room => this.onMoveResult(room));
    }
    onMoveResult(room) {
        console.log('onMoveResult', room.gameState.board);
        this.setState({ pieces: room.gameState.board });
    }
    render() {
        console.log('GameView.render');
        const stateDebug = React.createElement('pre', null, JSON.stringify(this.state, null, 2));
        console.log('pieces given to Board', this.state.pieces);
        return React.createElement('div', null, React.createElement(Board, {
            pieces: this.state.pieces,
            socket: this.props.socket,
        }), stateDebug);
    }
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCell: undefined
        };
    }
    getInitialState() {
    }
    cellName(x, y) {
        return "abcdefgh"[x] + String(y);
    }
    makePieceMap() {
        return this.props.pieces.reduce((map, piece) => {
            const pos = piece.position.col + piece.position.row;
            map[pos] = piece;
            return map;
        }, {});
    }
    makeCells() {
        const pieceMap = this.makePieceMap();
        const elements = [];
        for (var y = 8; y > 0; y--) {
            for (var x = 0; x < 8; x++) {
                const pos = this.cellName(x, y);
                const piece = pieceMap[pos.toLowerCase()];
                const isSelected = this.state.selectedCell == pos ? 'selected' : '';
                let pieceImage = null;
                if (piece) {
                    const className = `piece ${piece.color} ${piece.type} `;
                    pieceImage = React.createElement('div', {
                        className: className,
                    });
                }
                elements.push(React.createElement('div', {
                    className: `cell ${isSelected}`,
                    onClick: () => this.selectCell(pos),
                }, pieceImage));
            }
        }
        return elements;
    }
    posToJson(pos) {
        return {
            col: pos.charAt(0),
            row: pos.charAt(1),
        };
    }
    selectCell(pos) {
        if (this.state.selectedCell) {
            const movement = {
                from: this.posToJson(this.state.selectedCell),
                dest: this.posToJson(pos),
            };
            this.props.socket.emit('move', movement);
            this.setState({ selectedCell: undefined });
        }
        else {
            console.log(`selected piece at ${pos}`);
            this.setState({ selectedCell: pos });
        }
    }
    render() {
        console.log('Board.render', this.props);
        return React.createElement('div', { className: 'board' }, this.makeCells());
    }
}
