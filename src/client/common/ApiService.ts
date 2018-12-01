import request from "request-promise";
import * as Majavashakki from "../../common/GamePieces";

const base = window.location.origin;
export default class ApiService {
  public static read = {
    user:           async () => await getIt<global.IUserContract>("api/user"),
    availableGames: async () => await getIt<string[]>("api/games"),
    myGames:        async () => await getIt<string[]>("api/games/my-games"),
    game:           async (title: string) => await getIt<Majavashakki.IGame>(`api/games/get/${title}`)
  };

  public static write = {
    game:     async (title: string) => await postIt<global.IGameRef>("api/games", {title}),
    joinGame: async (title: string) => await postIt<global.IGameRef>("api/games/join", {title}),
    // TODO smarter responses from api?
    register: async (user: global.IUserContract) => await postIt<void>("api/user/register", user),
    login:    async (user: global.IUserContract) => await postIt<void>("api/login", user),
    user:     async (user: global.IUserContract) => await postIt<void>("api/user", user)
  }
}

export const postIt = async <T>(api: string, body: object): Promise<T> => {
  return await request({method: "POST", url: `${base}/${api}`, body, json: true})
}

export const getIt = async <T>(api: string): Promise<T> => {
  return await request({method: "GET", url: `${base}/${api}`, json: true})
}
