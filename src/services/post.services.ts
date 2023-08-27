import { CommentModel, CreatPostPayload, PostCommetPayload, PostModel } from '../types';
import { pool } from '../lib'
import { QueryResult } from 'pg'


export const savePost = async (postData: CreatPostPayload): Promise<PostModel> => {
  const { user_id, title, content, } = postData
  const query = `
  INSERT INTO posts (title, content, user_id, created_at, updated_at)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

  const values = [title, content, user_id, new Date(), new Date()];
  const result: QueryResult<PostModel> = await pool.query(query, values);
  return result.rows[0]

}

export const getPostByUserId = async (userId: string): Promise<PostModel[]> => {
  const query = 'SELECT * FROM posts WHERE user_id = $1';
  const values = [userId];

  const result: QueryResult<PostModel> = await pool.query(query, values);
  return result.rows;
}


export const savePostComment = async ({ post_id, user_id, content }:
  { post_id: string; user_id?: string, content: string }): Promise<CommentModel> => {

  const query = `
  INSERT INTO comments (content, post_id, user_id, created_at, updated_at)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

  const values = [content, post_id, user_id, new Date(), new Date()];
  const result: QueryResult<CommentModel> = await pool.query(query, values);
  return result.rows[0]

}
export const fetchTopUser = async (): Promise<any> => {
  const query = `
  SELECT
    main_users.id,
    main_users.firstname,
    main_users.lastname,
    main_posts.title,
    main_comments.content
  FROM (
    SELECT
      users.id,
      users.firstname,
      users.lastname,
      posts.id AS post_id,
      posts.title,
      comments.content,
      ROW_NUMBER() OVER (PARTITION BY users.id ORDER BY posts.created_at DESC) AS rn
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    LEFT JOIN comments ON posts.id = comments.post_id
  ) AS main_users
  LEFT JOIN posts AS main_posts ON main_users.post_id = main_posts.id
  LEFT JOIN comments AS main_comments ON main_users.post_id = main_comments.post_id AND main_users.rn = 1
  ORDER BY (SELECT COUNT(*) FROM posts WHERE posts.user_id = main_users.id) DESC
  LIMIT 3;
`;

  const result: QueryResult<CommentModel> = await pool.query(query);
  return result.rows

}
