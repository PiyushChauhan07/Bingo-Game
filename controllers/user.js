const User=require('../models/user');


// Controller for adding new Friend
module.exports.AddFriend=(req,res)=>{
    return res.send("Friend Added successfully!!!!");
}

// Controller for deleting friend
module.exports.removeFriend=(req,res)=>{
    return res.send("Friend deleted successfully!!!");
}

// Controller for userhome Page
module.exports.homePage=(req,res)=>{
        User.findOne({username: req.session.username})
        .then(user => {
            if(user){
                return res.render('index',{
                    username: user.username,
                    name: user.name,
                    matches: user.matches
                })
            }
            else{
                req.flash('error','Server error , Please login !!!');
            return res.redirect('/auth/signin');
            }
        })
        .catch(err =>{
            console.log(err);
            req.flash('error','Server error , Please login !!!');
            return res.redirect('/auth/signin');
        })
    }
    