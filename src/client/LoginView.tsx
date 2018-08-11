import * as React from "react";
import { withRouter } from "react-router-dom";
import CircularProgress from "material-ui/CircularProgress";
import TextField from "material-ui/TextField";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";

// TODO: Maybe split login/lobby

import * as request from "request-promise";

class LoginView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            newRoomName: "",
            showLogin: true,
            rooms: [],
            inGame: false,
        };

        // Remove game from list when it becomes full
        this.props.socket.on("game-full", fullRoom => {
            this.setState({
                rooms: this.state.rooms.filter(room => room !== fullRoom),
            });
        });

        this.props.socket.on("lobby-error", ({error}) => {
            this.setState({error});
        });

        this.props.socket.on("game-joined", () => {
          this.props.history.push('/game')
        });
    }

    public onSubmitLogin(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        const username = this.cleanInput(this.state.username);
        if (username) {
            newUserReq(username).then(() => {
                // User has logged in. Switch the page to room selection.
                this.setState({isLoading: true});
                if (!this.state.username) {
                    this.setState({username});
                }

                getOpenGames().then((data) => {
                    console.log(typeof(data))
                    console.log(data)
                    this.setState({
                        showLogin: false,
                        rooms: data,
                        isLoading: false,
                    });
                })
            })
        }
    }

    public onSubmitNewRoom(event) {
        event.preventDefault();
        const gameName = this.cleanInput(this.state.newRoomName);
        if (gameName) {
            createGame(gameName).then((game) => {
                this.setState({
                    rooms: [...this.state.rooms, game.title],
                });
                joinGame(game.title);
            })
        }
    }

    public cleanInput(input: string): string {
        return input.trim().replace("<", "").replace(">", "");
    }

    public onInputChange({target}) {
        this.setState({[target.name]: target.value});
    }

    public onRoomClick(gameName: string) {
        joinGame(gameName);
    }

    public renderLoading() {
        const style = {marginTop: "50%", marginLeft: "50%"};
        return <CircularProgress size={40} style={style} />;
    }

    public render() {
        // Do not show login/lobby when in game
        if (this.state.inGame) {
            return null;
        }

        const onInputChange = this.onInputChange.bind(this);
        if (this.state.showLogin && this.state.isLoading) {
            return this.renderLoading();
        } else if (this.state.showLogin) {
            const onSubmitLogin = this.onSubmitLogin.bind(this);

            return (
                <div className="login page">
                    <div className="form">
                        <h3 className="title">What's your nickname?</h3>
                        <form onSubmit={onSubmitLogin}>
                          <TextField name="username" hintText="Username" onChange={onInputChange} />
                        </form>
                    </div>
                </div>
            );
        } else {
            const onRoomClick = room => () => this.onRoomClick(room);
            const onSubmitNewRoom = this.onSubmitNewRoom.bind(this);

            return (
                <div className="room page">
                    <h2 id="roomWelcome">
                        Hello {this.state.username}! Welcome to Majavashakki.
                        Please, join existing game or create a new one.
                    </h2>
                    <List>
                        {this.state.rooms.map(room => [<ListItem key={room} onClick={onRoomClick(room)}>{room}</ListItem>, <Divider />])}
                    </List>
                    {this.state.error && <p>Error: {this.state.error}</p>}
                    <div className="newRoomArea">
                        <form onSubmit={onSubmitNewRoom}>
                            Create new room:
                            <TextField
                                name="newRoomName"
                                hintText="Room name"
                                onChange={onInputChange}
                            />
                        </form>
                    </div>
                </div>
            );
        }
    }
}

function newUserReq(name) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/newuser",
        body: {name},
        json: true,
    })
}

function getOpenGames() {
    return request({
        method: "GET",
        url: window.location.origin + "/api/games",
        json: true
    })
}

function createGame(name) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games",
        body: {name},
        json: true
    })
}

function joinGame(name) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games/join",
        body: {name},
        json: true
    })
}

export default withRouter(LoginView);
