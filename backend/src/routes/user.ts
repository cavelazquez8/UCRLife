import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

//router.get("/", UserController.getUsers);

router.post("/", UserController.usersignup);

export default router;