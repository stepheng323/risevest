import { Router } from 'express'
import { fetchUsers, login, signup } from '../controllers/user.controllers'
import { vaidateLogin, validateCreateUser } from '../middlewares/user.validation'


const userRouter = Router()


userRouter.post('/signup', validateCreateUser, signup)
userRouter.post('/login', vaidateLogin, login)
userRouter.get('/users', fetchUsers)


export default userRouter