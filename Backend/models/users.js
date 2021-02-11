const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        min:5,
        max:100,
    },
    email: {
        type:String,
        required:true,
        min:6,
        max:255,
    },
    password: {
        type:String,
        required:true,
    },
    create_date:{
        type:Date,
        default:Date.now,
    },
    is_active:{
        type:Boolean,
        default:false,
    },
})

module.exports = mongoose.model('user',UserSchema);