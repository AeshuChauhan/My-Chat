import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import { verifyJWT } from '../middlewares/auth.moddleware.js';
const router = express.Router();

// Router configuration

router.route('/send/:id').post(verifyJWT, sendMessage);
router.route('/get/:id').post(verifyJWT, getMessage);

export default router;