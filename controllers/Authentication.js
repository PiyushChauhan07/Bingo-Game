const User=require('../models/user');


// Getting Login Page
module.exports.get_signin=(req,res)=>{
    return res.render('login')
}

// Make user loggedin
module.exports.post_signin=(req,res)=>{
    const { username , password } = req.body;
    return res.send("Logged in Successfully !!!!!");
}

// Getting Register Page
module.exports.get_signup=(req,res)=>{
    return res.render('Signup');
}

// Registering the user
module.exports.post_signup=(req,res)=>{
    return res.send("Registered Successfully !!!!");
}