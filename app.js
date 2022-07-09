const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const customware = require('./config/flashmiddleware')
dotenv.config();
const http = require('http');
const socketIO = require('socket.io');
const Rooms = require('./models/room');
const Users = require('./models/user');
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
        winner: []
    }]
]);

var connectedId = new Map([
    [11232, {
        roomid: 1234,
        username: 'hello'
    }]
]);

// Socket events
io.on('connection', (socket) => {

    socket.on('join-room', ({ roomid, username }) => {
        connectedId.set(socket.id, {
            roomid: roomid,
            username: username
        });
        socket.join(roomid);
        socket.room = roomid;
        socket.nickname = username;
        socket.in(roomid).emit('user-joined', username);
        if (!rooms.has(roomid)) {
            rooms.set(roomid, {
                userList: [],
                playing: false,
                move: 0,
                winner: []
            })
        }
        var found = false;
        for (var i = 0; i < rooms.get(roomid).userList.length; i++) {
            if (rooms.get(roomid).userList[i] === username) {
                found = true;
                break;
            }
        }
        if (!found)
            rooms.get(roomid).userList.push(username);
        io.in(roomid).emit('user-list', rooms.get(roomid).userList);
    });



    // Game Starting
    socket.on('start', ({ roomid, username }) => {
        socket.in(roomid).emit('started', username);
        io.in(roomid).emit('turn', {
            usr: rooms.get(roomid).userList[rooms.get(roomid).move]
        })
    });

    socket.on('move', ({ username, num, roomid }) => {
        socket.in(roomid).emit('other-turn', { username, num });
        let v = rooms.get(roomid).move;
        v++;
        rooms.get(roomid).move = v % rooms.get(roomid).userList.length;
        setTimeout(() => {
            io.in(roomid).emit('turn', {
                usr: rooms.get(roomid).userList[rooms.get(roomid).move]
            });
        }, 500)

    });

    socket.on('win', ({ username, roomid }) => {
        // console.log(username+" "+roomid);
        rooms.get(roomid).winner.push(username);
        io.in(roomid).emit('finish', username);

    });

    socket.on('updateResult', ({ username, roomid }) => {
        // console.log(roomid+" "+username);
        Users.findOne({ username: username })
            .then((user, err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(user);
                    if(user){
                    user.matches.played++;
                    var found = false;
                    for (var i = 0; i < rooms.get(roomid).winner.length; i++) {
                        if (rooms.get(roomid).winner[i] === username) {
                            found = true;
                        }
                    }
                    if (found){
                        user.matches.won++;
                    }
                    else{
                        user.matches.lost++;
                    }
                    console.log(user);
                    user.save();
                    }
                }
            })
            .catch(err =>{
                console.log(err);
            })
    })

    // For Chat Messages
    socket.on('send', ({ username, message, roomid }) => {
        socket.in(roomid).emit('receive', { username, message });
    })

    socket.on('disconnect', async () => {
        const { roomid, username } = connectedId.get(socket.id);
        let index = rooms.get(roomid).userList.indexOf(username);
        rooms.get(roomid).userList.splice(index, 1);
        await Rooms.findOneAndUpdate({ roomid: roomid }, { $pull: { playersPresent: username } }).exec();
        io.in(roomid).emit('user-list', rooms.get(roomid).userList);
    })



})


PORT = process.env.PORT || 5100;

server.listen(PORT, (err) => {
    console.log(`Server running at ${PORT}`);
})