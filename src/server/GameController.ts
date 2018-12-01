import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import { User } from "./data/User";

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
  }
}