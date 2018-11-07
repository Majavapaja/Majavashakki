declare namespace global {
  export interface IUserContract { // TODO unify with IUser?
    id: string;
    name: string;
    email: string;
    password?: string;
  }

  export interface IGameRef { // TODO Unify with IGame?
    ref: string;
    title: string;
    active: boolean;
  }
}