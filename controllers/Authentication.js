const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');


// Getting Login Page
module.exports.get_signin = (req, res) => {
    return res.render('login')
}

// Make user loggedin
module.exports.post_signin = async (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, ismatch) => {
                    if (err) { console.log(err) }
                    if (ismatch) {
                        const token = jwt.sign({ username: username }, process.env.secret_key);
                        req.session.username = username;
                        res.cookie('jwt', token);
                        return res.redirect(`/`);
                    }
                    else {
                        req.flash('error', 'Please add correct details !!!');
                        return res.redirect('/auth/signin');
                    }
                })

            }
            else {
                req.flash('error', 'User not exist !!!!');
                return res.redirect('/auth/signin');
            }
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Server error !!!!');
            return res.redirect('/auth.login');
        })


}

// Getting Register Page
module.exports.get_signup = (req, res) => {
    return res.render('signup');
}

// Registering the user
module.exports.post_signup = (req, res) => {
    const { username, password, password2, name } = req.body;
    if (password !== password2) {
        req.flash('error', 'Passwords are not matching');
        return res.redirect('/auth/signup');
    }
    else {
        User.findOne({ username })
            .then(user => {
                if (!user) {
                    const newUser = new User({
                        username, password, name
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (error, hash) => {
                            if (error) {
                                console.log(error);
                                req.flash('error', 'Server Error, Please Try again after sometime!!!!');
                                res.redirect('/auth/signup');

                            }
                            else {
                                newUser.password = hash;
                                newUser.save();
                            }
                        })
                    })
                    const token = jwt.sign({ username: username }, process.env.secret_key);
                    res.cookie('jwt', token);
                }
                req.flash('success', 'Please login !!!!');
                return res.redirect('/auth/signin');
            })
            .catch(err => {
                req.flash('error', 'Server error, try again later !!!');
                return res.redirect('/auth/signup');
            })
    }
}

// For Logging out user
module.exports.get_signout=(req,res)=>{
    req.session.destroy();
    res.cookie('jwt','none');
    res.redirect('/');
}