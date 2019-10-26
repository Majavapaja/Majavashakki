import GameStore from "./GameStore"
import UserStore from "./UserStore"
import ApiService from "../common/ApiService"
import PromotionDialogStore from "./PromotionDialogStore"
import LobbyStore from "./LobbyStore"
import MessagePanelStore from "../routes/game/MessagePanel/MessagePanelStore";
import PopupNotificationStore from "./PopupNotificationStore";

export default class AppStore {
  public notification = new PopupNotificationStore();
  public api = new ApiService(this.notification)
  public user = new UserStore(this.api)
  public game = new GameStore(this)
  public promotionDialog = new PromotionDialogStore(this)
  public lobby = new LobbyStore(this)
  public messagePanel = new MessagePanelStore(this)
}

export interface IRootStore {
  app: AppStore;
}