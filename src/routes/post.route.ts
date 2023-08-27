import { Router } from 'express'
import { checkAuth } from '../middlewares/auth.middleware'
import { createPost, fetchPosts, getTopRankedUser, getUserPosts, postComment } from '../controllers/post.controller'
import { validateCreatePost, validatePostComment } from '../middlewares/post.validation'


const postRouter = Router()


postRouter.post('/', checkAuth, validateCreatePost, createPost)
postRouter.get('/', fetchPosts)
postRouter.get('/users/:id', getUserPosts)

postRouter.post('/:post_id/comments', checkAuth, validatePostComment, postComment)
postRouter.get('/top-ranked-user', getTopRankedUser)


export default postRouter