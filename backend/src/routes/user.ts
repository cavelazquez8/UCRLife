import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

//router.get("/", UserController.getUsers);

router.post("/signup", UserController.usersignup);
router.post("/login", UserController.login);
router.get("/", UserController.getVerifiedUser);

export default router;