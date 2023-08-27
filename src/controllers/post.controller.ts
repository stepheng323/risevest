import { Request, Response, response } from 'express'
import { catchAsync, respondWithSuccess } from "../utils";
import { CreatPostPayload, PostCommetPayload } from '../types';
import { fetchTopUser, getPostByUserId, getPosts, savePost, savePostComment } from '../services';

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const { id: user_id } = req.user
  const postPayload = req.validatedData;
  const postData = { ...postPayload, user_id } as CreatPostPayload
  const post = await savePost(postData);
  return respondWithSuccess(res, 201, 'Post created successfully', post)
})


export const getUserPosts = catchAsync(async (req: Request, res: Response) => {
  const { id: user_id } = req.params
  const posts = await getPostByUserId(user_id);
  return respondWithSuccess(res, 200, 'Posts fetched successfully', posts)
})

export const fetchPosts = catchAsync(async (req: Request, res: Response) => {
  const { id: user_id } = req.params
  const posts = await getPosts();
  return respondWithSuccess(res, 200, 'Posts fetched successfully', posts)
})



export const postComment = catchAsync(async (req: Request, res: Response) => {
  const { id: user_id } = req.user;
  const { post_id } = req.params
  const { content } = req.validatedData as PostCommetPayload;
  const comment = await savePostComment({ post_id, user_id, content });
  return respondWithSuccess(res, 201, 'Comment created successfully', comment)
})

export const getTopRankedUser = catchAsync(async (req: Request, res: Response) => {

  const topUsers = await fetchTopUser(); 
  return respondWithSuccess(res, 200, 'Ranked user fetched successfully', topUsers);
})