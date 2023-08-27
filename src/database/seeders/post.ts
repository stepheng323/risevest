import { pool } from "../../lib";

(async () => {
  const posts = [
    { title: 'First Post', content: 'This is the content of the first post', user_id: 1 },
    { title: 'Second Post', content: 'This is the content of the second post', user_id: 2 },
    { title: 'Third Post', content: 'This is the content of the third post', user_id: 3 },
    { title: 'Fourth Post', content: 'This is the content of the fourth post', user_id: 4 },
    { title: 'Fifth Post', content: 'This is the content of the fifth post', user_id: 5 },
  ];

  for (const post of posts) {
    const query = 'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)';
    await pool.query(query, [post.title, post.content, post.user_id]);
  }
})();
