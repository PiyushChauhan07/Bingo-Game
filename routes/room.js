const express= require('express');
const Router=express.Router();
const { createRoom , joinRoom }=require('../controllers/room')
const {checkAuth} = require('../config/middleware')
// @Route: /room/create  for creating a room
Router.post('/create', checkAuth, createRoom)

// @Route: /room/:roomid/joined  for creating a room
Router.get('/:roomid/joined',checkAuth, joinRoom);



module.exports=Router;