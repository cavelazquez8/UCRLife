import express from 'express';
import * as UserController from '../controllers/user';
import { requireAuth } from '../middleware/auth';

const router = express.Router();
router.post('/signup', UserController.usersignup);
router.post('/login', UserController.login);
router.get('/', requireAuth, UserController.getVerifiedUser);
router.post('/logout', UserController.logout);
router.get("/username", UserController.getUser);
router.get('/:id/verify/:token', UserController.getVerifiedUser2);

export default router;
