declare module Majavashakki {
  interface IGame {
    title: string;
    playerIdWhite: any; // TODO mongo object id or string or swha?
    playerIdBlack: any;
    board: IBoard;
  }
}