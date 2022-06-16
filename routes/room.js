const express= require('express');
const Router=express.Router();
const { createRoom }=require('../controllers/room')
const {checkAuth} = require('../config/middleware')
// @Route: /room/create  for creating a room
Router.post('/create', checkAuth, createRoom)





module.exports=Router;