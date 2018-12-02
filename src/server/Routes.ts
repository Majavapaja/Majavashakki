import express from "express";
import { apiAuth, uiAuth } from "./auth";
import { resolve } from "path";
import UserController from "./UserController";
import GameController from "./GameController";
import { User } from "./data/User";

const router = express.Router();

// Root
router.get("/", uiAuth, (req, res, next) => {
  return User.validProfile(req.user) ? next() : res.redirect("/profile");
});

router.get("/api/user",           UserController.getUser);
router.post("/api/user",          UserController.postUser);
router.post("/api/user/register", UserController.registerUser);
router.post("/api/login",         UserController.loginUser);
router.get("/authFacebook",   UserController.loginFacebook);
router.get("/logout",         UserController.logout)

router.get("/api/games",           apiAuth, GameController.getAvailableGames);
router.get("/api/games/my-games",  apiAuth, GameController.getMyGames);
router.get("/api/games/get/:name", apiAuth, GameController.getGame)
router.post("/api/games",          apiAuth, GameController.postGame)
router.post("/api/games/join",     apiAuth, GameController.joinGame)

router.get("/login", serveUI)
router.get("/signup", serveUI)

router.get("*", uiAuth, serveUI)

function serveUI(req, res) {
  res.sendFile(resolve(__dirname, "../../dist/index.html"));
}

export default router;