import GameStore from "./GameStore"
import UserStore from "./UserStore"
import ApiService from "../common/ApiService"
import PromotionDialogStore from "./PromotionDialogStore"

export default class AppStore {
  public api = new ApiService()
  public user = new UserStore(this.api)
  public game = new GameStore(this)
  public promotionDialog = new PromotionDialogStore(this)
}

export interface IAppStore {
  app: AppStore;
}