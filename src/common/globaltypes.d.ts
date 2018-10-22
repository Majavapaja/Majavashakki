declare namespace global {
  export interface IUserContract {
    name: string;
    email: string;
    loggedIn: boolean;
    password?: string;
  }

  export interface IGameRef {
    ref: string;
    title: string;
    active: boolean;
  }
}