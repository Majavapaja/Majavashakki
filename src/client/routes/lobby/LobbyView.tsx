import * as React from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import GameList from "./GameList";
import request from "request-promise";
import ApiService from "../../common/ApiService";

class LobbyView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.handleJoinResponse = this.handleJoinResponse.bind(this)

        this.state = {
            newRoomName: "",
            availableGames: [],
            myGames: []
        };

        // Remove game from list when it becomes full
        this.props.socket.on("game-full", fullRoom => {
            this.setState({
                availableGames: this.state.availableGames.filter(room => room !== fullRoom),
            });
        });
    }

    public async componentDidMount() {
        const [availableGames, myGames] = await Promise.all([
            ApiService.read.availableGames(),
            ApiService.read.myGames()]);

        this.setState({availableGames, myGames});
    }

    public onSubmitNewRoom(event) {
        event.preventDefault();
        const gameTitle = this.cleanInput(this.state.newRoomName);
        if (gameTitle) {
            createGame(gameTitle).then((game) => {
                this.setState({
                    availableGames: [...this.state.availableGames, game],
                });
                // TODO don't join game immediatly, instead push to my-games?
                joinGame(game.title).then(this.handleJoinResponse)
            });
        }
    }

    public cleanInput(input: string): string {
        return input.trim().replace("<", "").replace(">", "");
    }

    public onInputChange({target}) {
        this.setState({[target.name]: target.value});
    }

    public handleJoinResponse({title}) {
        this.props.history.push(`/game/${title}`)
    }

    public render() {

        const onInputChange = this.onInputChange.bind(this);
        const onSubmitNewRoom = this.onSubmitNewRoom.bind(this);

        return (
            <div className="room page">
                <h2 id="roomWelcome">
                    Hello! Welcome to Majavashakki.
                    Please, join existing game or create a new one.
                </h2>
                <GameList games={this.state.availableGames} title="Avoimet pelit" />
                <GameList games={this.state.myGames} title="Minnun pellit" />
                {this.state.error && <p>Error: {this.state.error}</p>}
                <div className="newRoomArea">
                    <form onSubmit={onSubmitNewRoom}>
                        Create new room:
                        <TextField
                            name="newRoomName"
                            label="Room name"
                            onChange={onInputChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

function createGame(title) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games",
        body: {title},
        json: true,
    });
}

function joinGame(title) {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games/join",
        body: {title},
        json: true,
    });
}

export default withRouter(LobbyView);
