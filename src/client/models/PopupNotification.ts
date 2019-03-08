import { observable } from "mobx";

export default class PopupNotification {
  @observable
  public show: boolean = false;
  public message?: string
  public close = () => this.show = false;

  public notify = (message: string): void => {
    this.message = message
    this.show = true
  }
}
