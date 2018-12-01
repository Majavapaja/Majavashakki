import express from "express";
import { uiAuth, apiAuth } from "./auth";
import UserController from "./UserController";
import GameController from "./GameController";

const router = express.Router();

router.route("/user").get(UserController.getUser);
router.route("/user").post(UserController.postUser);
router.route("/user/register").post(UserController.registerUser);

router.route("/games").get(apiAuth, GameController.getAvailableGames);
router.route("/games/my-games").get(apiAuth, GameController.getMyGames);

export default router;