import  request from "request-promise";
import { StatusCodeError } from "request-promise/errors";
import * as Majavashakki from "../../common/GamePieces";
import { ApiGameInfo, ApiUser, UserUpdateRequest, CreateGameRequest, MoveRequest} from "../../common/types";
import { action } from "mobx";
import PopupNotificationStore from "../store/PopupNotificationStore";

const base = window.location.origin;

export default class ApiService {

  constructor(private error: PopupNotificationStore) {}

  public read = {
    user:           async () => await this.getIt<ApiUser>("api/user"),
    games:          async (inProgress: boolean) => await this.getIt<ApiGameInfo[]>(`api/games?inProgress=${inProgress}`),
    game:           async (id: string) => await this.getIt<Majavashakki.IGame>(`api/games/get/${id}`),
  };

  public write = {
    game:     async (title: string) => await this.postIt<CreateGameRequest, Majavashakki.IGame>("api/games", {title}),
    joinGame: async (id: string) => await this.postIt<CreateGameRequest, Majavashakki.IGame>(`api/games/${id}/join`),
    makeMove: async (id: string, moveRequest: MoveRequest) =>
      await this.postIt<MoveRequest, Majavashakki.IMoveResponse>(`api/games/${id}/move`, moveRequest),
    surrenderGame: async (gameId: string) => await this.postIt<void, any>(`api/games/${gameId}/surrender`),
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
        const response = ex.response as any;
        const errors = response.body.errors
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

function isValidationError(ex: Error): ex is StatusCodeError {
  return isStatusCodeError(ex) && ex.statusCode === 400
}

function isStatusCodeError(ex: Error): ex is StatusCodeError {
  return ex.name === "StatusCodeError";
}