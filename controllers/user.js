const User=require('../models/user');
const httpmsg= require('http-msgs');

// Controller for adding new Friend
module.exports.AddFriend=(req,res)=>{
    User.findById(req.body.to,(err,result)=>{
        if(err) { console.log(err);
            httpmsg.sendJSON(req,res,{
                done: 'false'
            })

        }
        result.Pending_request.push(req.body.from);
        result.save();
    })
    httpmsg.sendJSON(req,res,{
        done: 'true'
    })
}

// Controller for deleting friend
module.exports.removeFriend=(req,res)=>{
    rUser.findOne()
}

// Controller for accepting request
module.exports.accept_request=(req,res)=>{
    User.findOne({username: req.session.username},(err,result)=>{
        if(err) { console.log(err);
            // req.flash('error','Server Error, Please Try again after sometime!!!!');
            httpmsg.sendJSON(req,res,{
                done: 'false'
            })

        }
        result.friends.push(req.params.id);
        User.findByIdAndUpdate(req.user.id,{$pull : { Pending_request: req.params.id}},(err,done)=>{       
        });
        result.save();
        User.findById(req.params.id,(err,user)=>{
            if(err) { console.log(err);
                // req.flash('error','Server Error, Please Try again after sometime!!!!');
                httpmsg.sendJSON(req,res,{
                    done: 'false'
                })
    
            }
            user.friends.push(req.user.id);
            user.save();
            httpmsg.sendJSON(req,res,{
                done: 'true'
            })
        })
    })
}
// Controller for declining request
module.exports.decline_request=(req,res)=>{
    User.findByIdAndUpdate({username: req.session.username},{$pull : { Pending_request: req.params.id}},(err,done)=>{       
    });
    res.redirect('back');
};


// Controller for userhome Page
module.exports.homePage=(req,res)=>{
        if(req.session.username && req.session.username!=='NA'){

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
    else{
        req.flash('warning','Please register yourself');
        return res.render('index',{
            username: 'NA',
            name: 'NA',
            matches: {
                played: 0,
                won: 0,
                lost: 0
            }
        });
    }
    }
    