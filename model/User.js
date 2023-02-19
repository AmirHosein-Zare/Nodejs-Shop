const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 3,
        lowercase: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    number:{
        type: String,
        trim: true,
        required: true,
        minlength: 11,
        maxlength: 11
    },
    email:{
        type: String,
        required: true,
        trim: true,
        
    }
})