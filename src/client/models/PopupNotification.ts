import { observable } from "mobx";

export default class PopupNotification {
  @observable
  private show: boolean = false;
  // Case spesific user friendly errors maybe in version 2.0
  public defaultMessage: string = "Did not work. Resistance is futile. All your inputs are belong to us!"
  private message: string = this.defaultMessage;
  public close = () => this.show = false;

  public notify = (message: string): void => {
    this.message = message
    this.show = true
  }
}

export interface IPopupNotification {
  defaultMessage: string;
  close: () => void;

  notify: (message: string) => void;
}
