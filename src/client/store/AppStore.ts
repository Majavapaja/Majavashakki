import GameStore from "./GameStore"
import UserStore from "./UserStore"
import ApiService from "../common/ApiService"
import PromotionDialogStore from "./PromotionDialogStore"
import LobbyStore from "./LobbyStore"

export default class AppStore {
  public api = new ApiService()
  public user = new UserStore(this.api)
  public game = new GameStore(this)
  public promotionDialog = new PromotionDialogStore(this)
  public lobby = new LobbyStore(this)
  public UI
}

export interface IRootStore {
  app: AppStore;
}