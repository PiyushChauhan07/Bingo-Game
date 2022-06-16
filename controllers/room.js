const idGenerator=require('nodejs-unique-numeric-id-generator');

// Sending Room Id to admin so that admin can create room at Server level
module.exports.createRoom=(req,res)=>{
    const { numpi, botallowed }=req.body;
    console.log(req.body);
    
    // It will give me 6 digit unique id
    const roomid=idGenerator.generate(new Date().toJSON());
    res.render('gamePage',{
        roomid,
        numpi,
        botallowed,
        admin: true
    })
}