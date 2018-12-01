import express from "express";
import { uiAuth } from "./auth";
import UserController from "./UserController"

const router = express.Router();

router.route("/user").get(UserController.getUser);
router.route("/user").post(UserController.postUser);
router.route("/user/register").post(UserController.registerUser);

export default router;