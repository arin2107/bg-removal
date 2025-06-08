import express from 'express'
import { clerkWebhooks} from '../controllers/UserController.js';

const userRouter = express.Router()

userRouter.post('/clerk-webhooks', clerkWebhooks);  

export default userRouter;

