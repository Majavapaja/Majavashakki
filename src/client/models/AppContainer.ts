import Game from "./Game"
import UserStore from "./UserStore"
import ApiService from "../common/ApiService";

export default class AppContainer {
  public api = new ApiService();
  public game = new Game("", this.api);
  public user = new UserStore(this.api)
}

export interface IAppStore {
  app: AppContainer;
}