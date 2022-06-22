const jwt=require('jsonwebtoken');


module.exports.checkAuth=async (req,res,next)=>{
    
    if(req.session.username && req.session.username!=='NA' ){
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
        }
        
    }
   
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

