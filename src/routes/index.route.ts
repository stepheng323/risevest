import { Router } from 'express';
import userRouter from "./user.route";
import postRouter from './post.route';


const router = Router();


router.use('/user', userRouter)
router.use('/post', postRouter)



export default router;