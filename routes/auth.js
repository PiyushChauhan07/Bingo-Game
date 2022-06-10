const express=require('express')
const Router= express.Router();
const { get_signin, get_signup, post_signin, post_signup   } =require('../controllers/Authentication')

// @Route: /auth/signin   Getting Login Page
Router.get('/signin',get_signin);

// @Route: /auth/signin   Posting login information
Router.post('/signin',post_signin);

// @Route: /auth/signup   Getting Register Page
Router.get('/signup',get_signup);

// @Route: /auth/signup   For registering user
Router.post('/signup',post_signup);

module.exports=Router;
