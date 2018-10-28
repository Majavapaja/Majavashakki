import * as React from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import GameList from "./GameList";
import ApiService from "../../common/ApiService";
import {getSocket} from "../socket"

class LobbyView extends React.Component<any, any> {
    private socket: SocketIOClient.Socket;

    constructor(props: any) {
        super(props);

        this.socket = getSocket()

        this.state = {
            newRoomName: "",
            availableGames: [],
            myGames: []
        };
    }

    public async componentDidMount() {
        const [availableGames, myGames] = await Promise.all([
            ApiService.read.availableGames(),
            ApiService.read.myGames()
        ]);

        this.setState({availableGames, myGames});
    }

    public async onSubmitNewRoom(event) {
        event.preventDefault();

        const gameTitle = this.cleanInput(this.state.newRoomName);
        if (gameTitle) {
            const game = await ApiService.write.game(gameTitle);
            this.setState({availableGames: [...this.state.availableGames, game] });
            // TODO don't join game immediatly, instead push to my-games?
            const result = await ApiService.write.joinGame(gameTitle);
            this.props.history.push(`/game/${result.title}`)
        }
    }

    public cleanInput(input: string): string {
        return input.trim().replace("<", "").replace(">", "");
    }

    public onInputChange({target}) {
        this.setState({[target.name]: target.value});
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
                <GameList games={this.state.availableGames} title="Available games" />
                <GameList games={this.state.myGames} title="My games" />
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
export default withRouter(LobbyView);
