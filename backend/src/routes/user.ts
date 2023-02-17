import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

router.post("/signup", UserController.usersignup);

router.post("/login", UserController.login);

router.get("/", UserController.getVerifiedUser);

router.post("/logout", UserController.logout);

export default router;