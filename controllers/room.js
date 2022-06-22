const idGenerator = require('nodejs-unique-numeric-id-generator');
const Rooms = require('../models/room');

// Sending Room Id to admin so that admin can create room at Server level
module.exports.createRoom = (req, res) => {
    const { numpi, botallowed } = req.body;
    if (numpi == undefined) {
        req.flash('error', 'Please select number of players');
        return res.redirect('/');
    }
    // It will give me 6 digit unique id
    const roomid = idGenerator.generate(new Date().toJSON());
    Rooms.create({
        roomid,
        admin: req.session.username,
        botallowed,
        player: numpi
    }, (err, room) => {
        if (err) {
            req.flash('error', 'Server Error !!!!');
            return res.redirect('/');
        }
        else {
            return res.redirect(`/room/${room.roomid}/joined`);
        }
    })
}

module.exports.joinRoom = (req, res) => {
    const { roomid } = req.params;
    Rooms.findOne({ roomid: roomid })
        .then(room => {
            if (room) {
                if (room.player == room.playersPresent.length) {
                    req.flash('error', 'Sorry Room is full !!!!');
                    return res.redirect('/');
                }
                else{
                    var admin=false;
                    if(room.admin===req.session.username) admin=true;
                    var found=false;
                    for(var i=0;i<room.playersPresent.length;i++){
                        if(room.playersPresent[i]===req.session.username){
                            found=true;
                             break;
                        }
                    }
                    if(!found){
                    room.playersPresent.push(req.session.username);
                    room.save();
                    }
                    return res.render('gamePage',{
                        roomid,
                        admin,
                        numpi: room.player,
                        username: req.session.username
                    });
                }
            }
            else {
                req.flash('error', 'No Room exist !!!!');
                return res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Server error !!!!');
            return res.redirect('/');
        });
}