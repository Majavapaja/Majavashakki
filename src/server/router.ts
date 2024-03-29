import express from "express"
import { apiAuth, uiAuth } from "./auth"
import { resolve } from "path"
import { IUserDocument } from "./models/User"
import UserController from "./UserController"
import GameController from "./GameController"

const router = express.Router()

// Root with first level authentication
router.get("/", uiAuth, (req, res, next) => {
  const user = req.user as IUserDocument
  return user.name ? next() : res.redirect("/profile")
})

// Important!! Resolve serving of static files before catch-a-fish *
// but only after authentication has been resolved by root
router.use(express.static(resolve(__dirname, "../../dist")))

router.get("/api/user", UserController.getUser)
router.post("/api/user", UserController.postUser)
router.post("/api/user/register", UserController.registerUser)
router.post("/api/login", UserController.loginUser)
router.get("/authFacebook", UserController.loginFacebook)
router.get("/logout", UserController.logout)

router.get("/api/games", apiAuth, GameController.getGameList)
router.get("/api/games/get/:id", apiAuth, GameController.getGame)
router.post("/api/games", apiAuth, GameController.postGame)
router.post("/api/games/:id/join", apiAuth, GameController.joinGame)
router.post("/api/games/:id/move", apiAuth, GameController.makeMove)
router.post("/api/games/:gameId/surrender", apiAuth, GameController.surrender)

router.get("/login", serveUI)
router.get("/signup", serveUI)

router.get("*", uiAuth, serveUI)

function serveUI(req, res) {
  res.sendFile(resolve(__dirname, "../../dist/index.html"))
}

export default router
