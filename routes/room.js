const express= require('express');
const Router=express.Router();
const { createRoom }=require('../controllers/room')

// @Route: /room/create  for creating a room
Router.post('/create', createRoom)





module.exports=Router;