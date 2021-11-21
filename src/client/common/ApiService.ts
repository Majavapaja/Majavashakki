import * as Majavashakki from "../../common/GamePieces"
import { ApiGameInfo, ApiUser, UserUpdateRequest, CreateGameRequest, MoveRequest } from "../../common/types"
import { action } from "mobx"
import PopupNotificationStore from "../store/PopupNotificationStore"

const base = window.location.origin
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

export default class ApiService {
  constructor(private error: PopupNotificationStore) {}

  public read = {
    user: async () => await this.getIt<ApiUser>("api/user"),
    games: async (inProgress: boolean) => await this.getIt<ApiGameInfo[]>(`api/games?inProgress=${inProgress}`),
    game: async (id: string) => await this.getIt<Majavashakki.IGame>(`api/games/get/${id}`),
  }

  public write = {
    game: async (title: string) => await this.postIt<CreateGameRequest, Majavashakki.IGame>("api/games", { title }),
    joinGame: async (id: string) => await this.postIt<CreateGameRequest, Majavashakki.IGame>(`api/games/${id}/join`),
    makeMove: async (id: string, moveRequest: MoveRequest) =>
      await this.postIt<MoveRequest, Majavashakki.IMoveResponse>(`api/games/${id}/move`, moveRequest),
    surrenderGame: async (gameId: string) => await this.postIt<void, any>(`api/games/${gameId}/surrender`),
    register: async (user: global.IUserContract) =>
      await this.postIt<global.IUserContract, void>("api/user/register", user),
    login: async (user: global.IUserContract) => await this.postIt<global.IUserContract, void>("api/login", user),
    user: async (user: UserUpdateRequest) => await this.postIt<UserUpdateRequest, ApiUser>("api/user", user),
  }

  @action
  public postIt = async <RequestT, ResponseT>(api: string, body: RequestT = undefined): Promise<ResponseT> => {
    const result = await fetch(`${base}/${api}`, {
      method: "POST",
      body: body && JSON.stringify(body),
      headers,
    })
    return this.handleResponse(result)
  }

  @action
  private getIt = async <T>(api: string): Promise<T> => {
    const result = await fetch(`${base}/${api}`, { method: "GET", headers })
    return this.handleResponse(result)
  }

  private handleResponse = async (result: Response): Promise<any> => {
    if (result.ok) {
      if (!result.redirected) {
        // No JSON is returned if server responds with redirect
        return result.json()
      }
    } else if (result.status === 400 || result.status === 401) {
      const response = await result.json()
      this.error.notify(response.errors.join("\n"))
    } else {
      this.error.notify("Unexpected error occurred :(")
    }
  }
}
