const mongoose= require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    // username:{
    //     type: String,
    //     required: true
    // },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})
//create user model
const User = mongoose.model('user', UserSchema);

//export user model
module.exports = User;