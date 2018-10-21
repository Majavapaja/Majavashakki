declare namespace global {
  export interface IUserContract {
    name: string;
    email: string;
    loggedIn: boolean;
  }

  export interface IGameRef {
    ref: string;
    title: string;
    active: boolean;
  }
}