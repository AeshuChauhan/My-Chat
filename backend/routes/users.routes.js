import express from 'express';
import { verifyJWT } from '../middlewares/auth.moddleware.js';
import { getUserSidebar } from '../controllers/user.controller.js';
const router = express.Router();

router.route('/').post(verifyJWT, getUserSidebar);

export default router;