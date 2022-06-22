const express=require('express')
const Router= express.Router();
const { get_signin, get_signup, post_signin, post_signup, get_signout} =require('../controllers/Authentication')

// @Route: /auth/signin   Getting Login Page
Router.get('/signin',get_signin);

// @Route: /auth/signin   Posting login information
Router.post('/signin',post_signin);

// @Route: /auth/signup   Getting Register Page
Router.get('/signup',get_signup);

// @Route: /auth/signup   For registering user
Router.post('/signup',post_signup);

// @Route: /auth/signout  For Logging out user
Router.get('/signout',get_signout);

module.exports=Router;
