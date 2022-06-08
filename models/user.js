const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    matches: {
        played:{
            type: Number,
            default: 0
        },
        won: {
            type: Number,
            default: 0
        },
        lost:{
            type: Number,
            default: 0
        },
        win_streak: {
            type: Number,
            default: 0
        }
    },
    lastWin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const User=mongoose.model('User',userSchema);

module.exports=User;