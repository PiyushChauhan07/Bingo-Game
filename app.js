const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const customware = require('./config/flashmiddleware')
dotenv.config();
const http = require('http');
const socketIO = require('socket.io');
const Rooms = require('./models/room');
const app = express();

const server = http.createServer(app);

const io = socketIO(server);

// Connecting the database
require('./config/db')()

// Setting body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User session
app.use(session({
    secret: 'keyboardcat'
}));

// Adding static files path
app.use(express.static('./public'));

// Setting view engine
app.set('view engine', 'ejs');

// Flash Setting
app.use(flash());
app.use(customware.setFlash);

// @Routes: /       For all the routes
app.use('/', require('./routes'))

// ["piyush","rao","pepso","ritik"]
var rooms = new Map([
    [113232, {
        userList: [],
        playing: false,
        move: 0,
    }]
]);

// Socket events
io.on('connection', (socket) => {

    socket.on('join-room', ({ roomid, username }) => {
        console.log(`New user: ${username} has joined ${roomid}`);
        socket.join(roomid);
        socket.room = roomid;
        socket.nickname = username;
        socket.in(roomid).emit('user-joined', username);
        if (!rooms.has(roomid)) {
            rooms.set(roomid, {
                userList: [],
                playing: false,
                move: 0,
            })
        }
        var found=false;
        for( var i=0;i<rooms.get(roomid).userList.length;i++){
            if(rooms.get(roomid).userList[i]===username){
                found=true;
                break;
            }
        }
        if(!found)
        rooms.get(roomid).userList.push(username);

        console.log(rooms.get(roomid));
        io.in(roomid).emit('user-list',rooms.get(roomid).userList);
    });

    // For Chat Messages
    socket.on('send',({message,roomid,username})=>{
        socket.in(roomid).emit('receive',{ data:message ,user: username  })
    });

    // Game Starting
    socket.on('start',({roomid,username})=>{
        socket.in(roomid).emit('started',username);
        io.in(roomid).emit('turn',{
            usr: rooms.get(roomid).userList[rooms.get(roomid).move]
        })
    });

    socket.on('move', ({username,num})=>{
        
    });

    socket.on('win',({username,roomid})=>{
        io.in(roomid).emit('finish',username);
    });




})


PORT = process.env.PORT || 5100;

server.listen(PORT, (err) => {
    console.log(`Server running at ${PORT}`);
})