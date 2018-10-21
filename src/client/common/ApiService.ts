import request from "request-promise";

const base = window.location.origin;
export default class ApiService {
  public static read = {
    user: async (): Promise<global.IUserContract> =>      await request({ method: "GET", url: `${base}/api/user`,           json: true }),
    availableGames: async (): Promise<global.IGameRef> => await request({ method: "GET", url: `${base}/api/games`,          json: true }),
    myGames: async (): Promise<global.IGameRef> =>        await request({ method: "GET", url: `${base}/api/games/my-games`, json: true }),
  };
}
