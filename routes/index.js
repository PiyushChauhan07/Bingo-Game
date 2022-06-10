const express=require('express');
const Router=express.Router();

Router.get('/', (req,res)=>{
    res.render('index')
});

// Routes for authentications
Router.use('/auth',require('./auth'));

// Routes for Room
Router.use('/room',require('./room'));

// Routes for user
Router.use('/user',require('./user'));



module.exports=Router;