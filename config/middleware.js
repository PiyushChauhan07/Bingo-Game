const jwt=require('jsonwebtoken');


module.exports.checkAuth=async (req,res,next)=>{
    
    if(req.session.username){
        return next();
    }
    if( req.cookies && req.cookies.jwt && req.cookies.jwt!=='none'){
        try{
        const user=await jwt.verify( req.cookies.jwt, process.env.secret_key);
        req.session.username=user.username;
        return next();
        }
        catch(err){
            res.cookie('jwt','none');
            req.flash('error','Please login !!!');
            return res.redirect('/auth/login');
        }
        
    }
    req.flash('error','Please register yourself !!!')
    return res.redirect('/auth/signup');
}

