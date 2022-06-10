const express= require('express');
const Router=express.Router();
const { AddFriend, removeFriend } =require('../controllers/user');

// @Route: /user/add/:username   for Adding as friend
Router.post('/add/:username', AddFriend);

// @Route: /user/remove/:username  for removing as friend
Router.post('/remove/:username', removeFriend );

module.exports=Router;