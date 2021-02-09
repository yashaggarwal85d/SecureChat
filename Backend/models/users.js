const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    first_name: {
        type:String,
        required:true,
    },
    last_name: {
        type:String,
        required:true,
    },
    email: {
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