import request from "request-promise";
import * as Majavashakki from "../../common/GamePieces";
import { ApiGameInfo, ApiUser, UserUpdateRequest, CreateGameRequest } from "../../common/types";

const base = window.location.origin;
export default class ApiService {
  public static read = {
    user:           async () => await getIt<ApiUser>("api/user"),
    availableGames: async () => await getIt<ApiGameInfo[]>("api/games"),
    myGames:        async () => await getIt<ApiGameInfo[]>("api/games/my-games"),
    game:           async (id: string) => await getIt<Majavashakki.IGame>(`api/games/get/${id}`),
  };

  public static write = {
    game:     async (title: string) => await postIt<CreateGameRequest, Majavashakki.IGame>("api/games", {title}),
    joinGame: async (id: string) => await postIt<CreateGameRequest, Majavashakki.IGame>(`api/games/${id}/join`),
    // TODO smarter responses from api?
    register: async (user: global.IUserContract) => await postIt<global.IUserContract, void>("api/user/register", user),
    login:    async (user: global.IUserContract) => await postIt<global.IUserContract, void>("api/login", user),
    user:     async (user: UserUpdateRequest) => await postIt<UserUpdateRequest, ApiUser>("api/user", user),
  }
}

export const postIt = async <RequestT, ResponseT> (api: string, body: RequestT = undefined): Promise<ResponseT> => {
  return await request({method: "POST", url: `${base}/${api}`, body, json: true})
}

export const getIt = async <T> (api: string): Promise<T> => {
  return await request({method: "GET", url: `${base}/${api}`, json: true})
}
