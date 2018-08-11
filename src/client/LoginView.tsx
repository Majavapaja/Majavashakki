import * as React from "react";
import { withRouter } from "react-router-dom";
import CircularProgress from "material-ui/CircularProgress";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";

// TODO: Maybe split login/lobby

import * as request from "request-promise";

class LoginView extends React.Component<any, any> {



    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
        };
    }

    onSubmitLogin = (event) => {
        event.preventDefault();
        const username = this.cleanInput(this.state.username);
        if (username) {
            newUserReq(username).then(() => {
                // User has logged in. Switch the page to room selection.
                this.props.history.push("/lobby");
            })
        }
    }

    public cleanInput(input: string): string {
        return input.trim().replace("<", "").replace(">", "");
    }

    onInputChange = ({target}) => {
        this.setState({[target.name]: target.value});
    }

    public render() {

        return (
            <div className="login page">
                <div className="form">
                    <h3 className="title">What's your nickname?</h3>
                    <form onSubmit={this.onSubmitLogin}>
                        <TextField name="username" hintText="Username" onChange={this.onInputChange} />
                    </form>
                </div>
            </div>
        );
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
export default withRouter(LoginView);
