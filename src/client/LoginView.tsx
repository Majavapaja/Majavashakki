import * as React from "react";

// TODO: Maybe split login/lobby

class LoginView extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            newRoomName: "",
            showLogin: true,
            rooms: [],
            inGame: false,
        }

        // User has logged in. Switch the page to room selection.
        this.props.socket.on('login', (username: string) => {
            this.setState({loadingRooms: true})
            this.props.socket.emit("fetch-games")
        });

        // Replace room list when receiving full list of games
        this.props.socket.on("update-games", (gameRooms: Array<string>) => {
            this.setState({
                showLogin: false,
                rooms: gameRooms,
                loadingRooms: false,
            })
        });

        // Add new games to list
        this.props.socket.on("game-created", room => {
            this.setState({
                rooms: [].concat(this.state.rooms, [room])
            })
        })

        // Remove game from list when it becomes full
        this.props.socket.on("game-full", fullRoom => {
            this.setState({
                rooms: this.state.rooms.filter(room => room !== fullRoom),
            })
        })

        this.props.socket.on("lobby-error", ({error}) => {
            this.setState({error})
        })

        this.props.socket.on("game-joined", () => {
          this.setState({inGame: true})

          // FIXME: Not idiomatic way but what you gonna do
          const gamePage = document.querySelector(".game.page") as HTMLElement
          gamePage.style.display = "block"
        })
    }

    onSubmitLogin(event) {
        event.preventDefault()
        const username = this.cleanInput(this.state.username)
        if (username) {
            this.props.socket.emit('new user', username)
        }
    }

    onSubmitNewRoom(event) {
        event.preventDefault()
        const room = this.cleanInput(this.state.newRoomName)
        if (room) {
            this.props.socket.emit("create-game", room)
        }
    }

    cleanInput(input: string): string {
        return input.trim().replace("<","").replace(">","");
    }

    onInputChange({target}) {
        this.setState({[target.name]: target.value})
    }

    onRoomClick(room) {
        this.props.socket.emit("join-game", room)
    }

    render() {
        // Do not show login/lobby when in game
        if (this.state.inGame) {
            return null
        }

        const onInputChange = this.onInputChange.bind(this)

        if (this.state.showLogin) {
            const onSubmitLogin = this.onSubmitLogin.bind(this)
            const title = this.state.loadingRooms ?
                <h3 className="title">Loading rooms...</h3> :
                <h3 className="title">What's your nickname?</h3>

            return <div className="login page">
                <div className='form'>
                    {title}
                    <form onSubmit={onSubmitLogin}>
                        <input name="username" className="usernameInput" type="text" onChange={onInputChange} value={this.state.username}/>
                    </form>
                </div>
            </div>
        } else {
            const onRoomClick = room => () => this.onRoomClick(room)
            const onSubmitNewRoom = this.onSubmitNewRoom.bind(this)

            return <div className="room page">
                <h2 id="roomWelcome">
                    Hello {this.state.username}! Welcome to Majavashakki.
                    Please, join existing game or create a new one.
                </h2>
                <ul id="roomList">
                    {this.state.rooms.map(room =>
                        <li key={room} onClick={onRoomClick(room)}>{room}</li>)}
                </ul>
                {this.state.error && <p>Error: {this.state.error}</p>}
                <div className="newRoomArea">
                    <form onSubmit={onSubmitNewRoom}>
                        Create new room: <input name="newRoomName" type="text" onChange={onInputChange} value={this.state.newRoomName}/>
                    </form>
                </div>
            </div>
        }
    }
}

export default LoginView;