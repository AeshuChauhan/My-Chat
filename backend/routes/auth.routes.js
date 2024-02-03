import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
const router = express.Router();

router.route('/login').get(loginUser);
router.route('/register').post(registerUser);

export default router;