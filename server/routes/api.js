'use strict' 
const express = require('express');
const postCtrl = require('../controllers/posts');
const likeCtrl = require('../controllers/like');

const api = express.Router();

api.use(function(req, res, next) {
  console.log(`Requête API`);
  next();
});

/* POSTS */

api.get('/post/:post_id', postCtrl.getOnePost);
api.get('/post/:user_id', postCtrl.getAllPostsFromUser);
api.get('/post', postCtrl.getAllPostsFromFriendsAndMe);

api.put('/post/:post_id', postCtrl.updateOnePost);
api.delete('/post/:post_id', postCtrl.deleteOnePost);

/* LIKE */
api.get('/like/:post_id', likeCtrl.likeForOnePost);

module.exports = api;
