import * as React from "react";
import { withRouter } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";

class LoginView extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <RaisedButton label="Facebook" href="/authFacebook"></RaisedButton>
        );
    }
}

export default withRouter(LoginView);
