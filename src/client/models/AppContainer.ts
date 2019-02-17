import { observable, action, computed, decorate } from "mobx"
import Game from "./Game"

export default class AppContainer {
  public game = new Game("");
  public notification
}

export interface IAppStore {
  app: AppContainer;
}