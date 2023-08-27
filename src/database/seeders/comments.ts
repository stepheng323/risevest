import { pool } from "../../lib";


(async () => {
  const comments = [
    { content: 'Comment 1 for Post 1', post_id: 1, user_id: 1 },
    { content: 'Comment 2 for Post 1', post_id: 1, user_id: 2 },
    { content: 'Comment 3 for Post 2', post_id: 2, user_id: 3 },
    { content: 'Comment 4 for Post 3', post_id: 3, user_id: 4 },
    { content: 'Comment 5 for Post 4', post_id: 4, user_id: 5 },
    { content: 'Comment 6 for Post 4', post_id: 4, user_id: 1 },
    { content: 'Comment 7 for Post 5', post_id: 5, user_id: 2 },
    { content: 'Comment 8 for Post 10', post_id: 1, user_id: 1 },
    { content: 'Comment 9 for Post 10', post_id: 1, user_id: 2 },
    { content: 'Comment 10 for Post 10', post_id: 1, user_id: 2 },
    { content: 'Comment 11 for Post 10', post_id: 1, user_id: 2 },
    { content: 'Comment 12 for Post 10', post_id: 3, user_id: 2 },
  ];

  for (const comment of comments) {
    const query = 'INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3)';
    await pool.query(query, [comment.content, comment.post_id, comment.user_id]);
  }
})();
