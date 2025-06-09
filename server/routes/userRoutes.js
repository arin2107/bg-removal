import express from 'express';
import { clerkWebhooks } from '../controllers/UserController.js';

const router = express.Router();

router.post('/webhooks', clerkWebhooks);

export default router;
