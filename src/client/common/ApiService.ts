import request from "request-promise";
import * as Majavashakki from "../../common/GamePieces";
import { ApiGameInfo, ApiUser, UserUpdateRequest, CreateGameRequest } from "../../common/types";
import { action } from "mobx";
import PopupNotification from "../models/PopupNotification";

const base = window.location.origin;

export default class ApiService {

  public error = new PopupNotification();

  public read = {
    user:           async () => await this.getIt<ApiUser>("api/user"),
    availableGames: async () => await this.getIt<ApiGameInfo[]>("api/games"),
    myGames:        async () => await this.getIt<ApiGameInfo[]>("api/games/my-games"),
    finishedGames:  async () => await this.getIt<ApiGameInfo[]>("api/games/finished"),
    game:           async (id: string) => await this.getIt<Majavashakki.IGame>(`api/games/get/${id}`),
  };

  public write = {
    game:     async (title: string) => await this.postIt<CreateGameRequest, Majavashakki.IGame>("api/games", {title}),
    joinGame: async (id: string) => await this.postIt<CreateGameRequest, Majavashakki.IGame>(`api/games/${id}/join`),
    makeMove: async (id: string, from: Majavashakki.IPosition, dest: Majavashakki.IPosition, promotionType: Majavashakki.PieceType) =>
      await this.postIt<any, Majavashakki.IMoveResponse>(`api/games/${id}/move`, {from, dest, promotionType}),
    register: async (user: global.IUserContract) => await this.postIt<global.IUserContract, void>("api/user/register", user),
    login:    async (user: global.IUserContract) => await this.postIt<global.IUserContract, void>("api/login", user),
    user:     async (user: UserUpdateRequest) => await this.postIt<UserUpdateRequest, ApiUser>("api/user", user),
  }

  @action
  public postIt = async <RequestT, ResponseT> (api: string, body: RequestT = undefined): Promise<ResponseT> => {
    try {
      return await request({method: "POST", url: `${base}/${api}`, body, json: true})
    } catch (ex) {
      if (isValidationError(ex)) {
        const errors = ex.response.body.errors
        this.error.notify(errors.join("\n"))
      } else {
        this.error.notify("Unexpected error occurred :(")
      }
      throw ex
    }
  }

  @action
  private getIt = async <T> (api: string): Promise<T> => {
    return await request({method: "GET", url: `${base}/${api}`, json: true})
  }
}

function isValidationError(ex) {
  return ex.name === "StatusCodeError" && ex.statusCode === 400
}
