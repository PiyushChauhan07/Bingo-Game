const express= require('express');
const Router=express.Router();
const { AddFriend, removeFriend } =require('../controllers/user');

// @Route: /user/add/:username   for Adding as friend
Router.post('/add/:id', AddFriend);

// @Route: /user/remove/:username  for removing as friend
Router.post('/remove/:id', removeFriend );

module.exports=Router;