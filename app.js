const express=require('express');
const session=require('express-session');
const dotenv=require('dotenv');
const flash=require('connect-flash');
const customware=require('./config/flashmiddleware')
dotenv.config();
const http=require('http');
const socketIO=require('socket.io');
const User= require('./models/user');
const app=express();

const server= http.createServer(app);

const io=socketIO(server); 

// Connecting the database
require('./config/db')()

// Setting body-parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// User session
app.use(session({
    secret: 'keyboardcat'
  }));

// Adding static files path
app.use(express.static('./public'));

// Setting view engine
app.set('view engine','ejs');

// Flash Setting
app.use(flash());
app.use(customware.setFlash);

// @Routes: /       For all the routes
app.use('/',require('./routes'))


var rooms=[];

// Socket events
io.on('connection',(socket)=>{
     
    socket.on('new-user',({roomid,username})=>{
        console.log(`New user: ${username} has joined ${roomid}`);
    })


})


PORT= process.env.PORT || 5100;

server.listen(PORT,(err)=>{
    console.log(`Server running at ${PORT}`);
})