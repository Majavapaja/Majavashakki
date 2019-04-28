import * as React from "react"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography"

export default class ForgotPasswordDialog extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isOpen: false };
  }

  public handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  private handleClose = () => {
    this.setState({ isOpen: false });
  };

  public render() {
    return (
      <div>
        <a href="#" onClick={this.handleClickOpen}><Typography variant="caption" >Forgot password?</Typography></a>

        <Dialog open={this.state.isOpen} onClose={this.handleClose}>
          <DialogTitle>Forgot your password?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the email address you used to register your Majavashakki account,
              and we will send you a link to reset your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Change password
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}