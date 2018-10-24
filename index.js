const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const users = require('./routes/api/usersRoutes');
const profile = require('./routes/api/profileRoutes');
const posts = require('./routes/api/postsRoutes');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));