import { observable } from "mobx";

export default class PopupNotification {
  @observable
  public show: boolean = false;
  // Case spesific user friendly errors maybe in version 2.0
  public message: string = "Did not work. Resistance is futile. All your inputs are belong to us!";
  public close = () => this.show = false;
}

export interface IPopupNotification {
  show: boolean;
  message: string;
  close: () => void;
}
