const User=require('../models/user');


// Controller for adding new Friend
module.exports.AddFriend=(req,res)=>{
    return res.send("Friend Added successfully!!!!");
}

// Controller for deleting friend
module.exports.removeFriend=(req,res)=>{
    return res.send("Friend deleted successfully!!!");
}