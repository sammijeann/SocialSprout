import connection from '../config/connection.js';
import { User } from '../models/index.js';
import getRandomName from './data.js';

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
  // Delete the collections if they exist
  let postCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
  if (postCheck?.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = username + "@email.com";

    users.push({
      username,
      email,
    });
  }

  await User.insertMany(users);
  console.log(users);
  process.exit(0);
});
