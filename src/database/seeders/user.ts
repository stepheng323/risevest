import { pool } from "../../lib";

(async () => {

  const users = [
    { email: 'user1@example.com', firstname: 'John', lastname: 'Doe', password: 'password1' },
    { email: 'user2@example.com', firstname: 'Jane', lastname: 'Smith', password: 'password2' },
    { email: 'user3@example.com', firstname: 'Alice', lastname: 'Johnson', password: 'password3' },
    { email: 'user4@example.com', firstname: 'Bob', lastname: 'Brown', password: 'password4' },
    { email: 'user5@example.com', firstname: 'Ella', lastname: 'Williams', password: 'password5' },
  ];

  for (const user of users) {
    const query = 'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [user.email, user.firstname, user.lastname, user.password]);
  }

  await pool.end();
})();
