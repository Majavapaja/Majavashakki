import * as React from "react";
import { inject, observer } from "mobx-react";
import { IRootStore } from "client/store/AppStore";
import Snackbar from "@material-ui/core/Snackbar";
import ApiService from "./ApiService";

@inject((stores: IRootStore) => ({api: stores.app.api}))
@observer
class NotificationView extends React.Component<INotificationProps, any> {

  public render() {
    return (
      <Snackbar
        id="notification-snackbar"
        open={this.props.api.error.show}
        autoHideDuration={6000}
        message={this.props.api.error.message}
        onClose={this.props.api.error.close}
      />
    );
  }
}

interface INotificationProps {
  api?: ApiService;
}

export default NotificationView