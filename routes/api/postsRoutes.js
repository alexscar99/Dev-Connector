const express = require('express');
const router = express.Router();
const passport = require('passport');

const validatePostInput = require('../../validation/post');

const Post = require('../../models/Post');

// create post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { text, name, avatar } = req.body;

    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text,
      name,
      avatar
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
