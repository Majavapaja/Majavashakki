import request from "request-promise";

const base = window.location.origin;
export default class ApiService {
  public static read = {
    user: async (): Promise<global.IUserContract> =>      await request({ method: "GET", url: `${base}/api/user`,           json: true }),
    availableGames: async (): Promise<global.IGameRef> => await request({ method: "GET", url: `${base}/api/games`,          json: true }),
    myGames: async (): Promise<global.IGameRef> =>        await request({ method: "GET", url: `${base}/api/games/my-games`, json: true }),
  };

  public static write = {
    game:     async (title: string): Promise<global.IGameRef> => await request({method: "POST", url: `${base}/api/games`,       body: {title}, json: true}),
    joinGame: async (title: string): Promise<global.IGameRef> => await request({method: "POST", url: `${base}/api/games/join`,  body: {title}, json: true})
  }
}