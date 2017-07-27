import {Piece} from './types'

export interface MoveSuccess {
  kind: "success"
  board: [Piece]
}

export interface MoveError  {
  kind: "error"
  error: string
}

export type MoveResponse = MoveSuccess | MoveError
