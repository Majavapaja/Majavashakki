import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import { User } from "./data/User";
import { SessionSocketMap } from "./Sockets";
import Game from "./entities/Game";

const roomRepo = GameRoomsRepository.getInstance();

export default {
  getAvailableGames: async (req, res) => {
    const openGames = await roomRepo.getAvailableGames(req.user._id);
    res.send(openGames);
   },

   getMyGames: async (req, res) => {
    const {user} = req;
    const myGames = await User.getMyGames(user._id); // TODO active rule for fetch
    res.send(myGames);
  },

  getGame: async (req, res) => {
    const {session, params: {name}} = req
    const socket = SessionSocketMap[session.id];

    // TODO: Check the user has permissions to the game
    const game = await roomRepo.getGameRoom(name);
    socket.join(game.title)

    // TODO Return lightweight interface instead?
    if (game) {
      res.send(Game.MapForDb(game));
    } else {
      res.status(404).send({error: "Game not found"})
    }
  },

  postGame: async (req, res) => {
    const {session, body: {title}} = req
    const game = await roomRepo.createRoom(title)
    const socket = SessionSocketMap[session.id];
    // TODO this broadcast is not supported anymore? Does other users see new games when created?? Check if this is "oopsies".
    socket.broadcast.to(this.MainRoom).emit("game-created", game.title);
    res.send(game);
  },

  joinGame: async (req, res) => {
    const {session, body: {title}} = req
    const socket = SessionSocketMap[session.id];
    const userId = req.user._id
    const game = await roomRepo.joinRoom(socket, title, String(userId)) // TODO: Handle full room exception

    socket.leaveAll(); // TODO Move room data into some smart structure inside session when its needed (not yet)
    socket.join(title); // TODO we should use game ids
    res.send(game);
  }
}