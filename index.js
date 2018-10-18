const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
