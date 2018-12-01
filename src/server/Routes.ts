import express from "express";
import { apiAuth } from "./auth";
import UserController from "./UserController";
import GameController from "./GameController";

const router = express.Router();

router.get("/user",           UserController.getUser);
router.post("/user",          UserController.postUser);
router.post("/user/register", UserController.registerUser);
router.post("/login",         UserController.loginUser);
router.get("/authFacebook",   UserController.loginFacebook);

router.get("/games",           apiAuth, GameController.getAvailableGames);
router.get("/games/my-games",  apiAuth, GameController.getMyGames);
router.get("/games/get/:name", apiAuth, GameController.getGame)
router.post("/games",          apiAuth, GameController.postGame)

export default router;