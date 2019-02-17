import Game from "./Game"
import ApiService from "../common/ApiService";

export default class AppContainer {
  public api = new ApiService();
  public game = new Game("", this.api);
}

export interface IAppStore {
  app: AppContainer;
}