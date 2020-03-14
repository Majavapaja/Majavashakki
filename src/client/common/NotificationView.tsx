import * as React from "react";
import { inject, observer } from "mobx-react";
import { IRootStore } from "client/store/AppStore";
import Snackbar from "@material-ui/core/Snackbar";
import PopupNotificationStore from "../store/PopupNotificationStore";

@inject((stores: IRootStore) => ({notification: stores.app.notification}))
@observer
class NotificationView extends React.Component<INotificationProps, any> {

  public render() {
    return (
      <Snackbar
        id="notification-snackbar"
        open={this.props.notification.show}
        autoHideDuration={6000}
        message={this.props.notification.message}
        onClose={this.props.notification.close}
      />
    );
  }
}

interface INotificationProps {
  notification?: PopupNotificationStore;
}

export default NotificationView