import { observable, action } from "mobx"
import { ApiGameInfo } from "../../common/types"
import AppStore from "./AppStore"
import ApiService from "client/common/ApiService"
import UserStore from "./UserStore"

export default class LobbyStore {
  private _api: ApiService
  private _user: UserStore

  @observable public isLoading: boolean
  @observable public error: boolean
  @observable public myGames: ApiGameInfo[]
  @observable public availableGames: ApiGameInfo[]
  @observable public finishedGames: ApiGameInfo[]
  @observable public dialogOpen: boolean = false

  constructor(rootStore: AppStore) {
    this._api = rootStore.api
    this._user = rootStore.user

    this.isLoading = true
  }

  @action.bound
  public async fetchGames(): Promise<void> {
    this.error = false
    this.isLoading = true

    // Ensure that we have current users information before fetching games
    // Currently this information is refreshed in NavigationBar, so it is not yet available when Lobby renders
    await this._user.refreshFromServer()

    try {
      const games = await this._api.read.games(true)
      this.myGames = games.filter(this.isMyGame)
      this.availableGames = games.filter(game => !this.isMyGame(game))

      this.finishedGames = await this._api.read.games(false)
    } catch (error) {
      this.error = true
    }

    this.isLoading = false
  }

  @action.bound
  public async onLobbyUpdate() {
    await this.fetchGames()
  }

  @action.bound
  public closeNewForm() {
    this.dialogOpen = false
  }

  @action.bound
  public openNewForm() {
    this.dialogOpen = true
  }

  private isMyGame(game): boolean {
    if (game.playerBlack && game.playerBlack.id === this._user.id) return true
    if (game.playerWhite && game.playerWhite.id === this._user.id) return true
    return false
  }
}
