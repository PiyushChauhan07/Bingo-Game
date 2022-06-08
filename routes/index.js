const express=require('express');
const idGenerator=require('nodejs-unique-numeric-id-generator');
const Router=express.Router();

Router.get('/', (req,res)=>{
    res.render('index')
});

Router.post('/createroom',(req,res)=>{
    const { numpi , botallowed='off' }=req.body;
    console.log(numpi+" "+botallowed)
    return res.send("Uploaded")
})



module.exports=Router;