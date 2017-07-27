import * as React from "React";

class LoginView extends React.Component<any,any> {

    constructor(socket: SocketIOClient.Socket) {
        super(socket);
            // User has logged in. Switch the page to room selection.
            this.props.socket.on('login', function (username: string) {
            // Render welcome and room selection data
            // Login variables
            var loginPage = document.querySelector('.login.page') as HTMLElement; // The login page
            var lobbyTitle = document.querySelector("#roomWelcome") as HTMLElement;
            var roomPage = document.querySelector(".room.page") as HTMLElement; // The room selection page

            // rest of crap
            lobbyTitle.innerHTML = "Hello " + username + "! Welcome to Majavashakki. Please, join existing game or create a new one.";
            loginPage.style.display = "none"; // TODO FADE TO MAKE IT PRETTY (CSS OR REACT?)
            roomPage.style.display = "block";
            this.props.socket.emit("fetch-games");
        }.bind(this));
        this.props.socket.on("update-games", function(gameRooms: Array<string>) {
            for(let i=0; i < gameRooms.length; i++){
                this.showRoomInList(gameRooms[i]);
            }
        }.bind(this));
    }

    login = (event) => {
        if(event.which === 13) {
            var username = this.cleanInput(event.target.value.trim());
            if (username) {
                console.log(username);
                this.props.socket.emit('new user', username);
            }
        }
    }

    cleanInput (input: string) {
        return input.replace("<","").replace(">","");
    }

    // Add new room to UI and attach join event
    showRoomInList = (roomTitle: string) => {
        var rooms = document.querySelector("#roomList");
        var newRoom = document.createElement("div");
        newRoom.id = roomTitle;
        newRoom.innerText = roomTitle;
        newRoom.addEventListener("click",function(event){
            this.props.socket.emit("join-game", roomTitle);
        }.bind(this));
        rooms.appendChild(newRoom);
    }

  // Focus input when clicking anywhere on login page // TODO do we need this shit?
  // function focusInput(event){currentInput.focus();}
  // loginPage.addEventListener("click", focusInput);

    render() {
        return <div className='form'>
            <h3 className="title">What's your nickname?</h3>
            <input className="usernameInput" type="text" onKeyDown={this.login}></input>
        </div>
    }
}

export default LoginView;