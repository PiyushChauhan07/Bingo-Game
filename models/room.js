const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    roomid:{
        type: String,
        required: true,
        unique: true
    },
    admin:{
        type: String,
        required: true
    },
    botsAllowed:{
        type: Boolean,
        default: false
    },
    player:{
        type: Number,
        required: true,
        default: 0
    },
    playersPresent:[
        {
            type: String
        }
    ]
    
},{
    timestamps: true
});

const Room=mongoose.model('Room',userSchema);

module.exports=Room;