const mongoose = require('mongoose');

// regular expression for email
let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

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
        match: regex
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 255
    },
    comments: [String], // replace it with Comment Model
    address:{
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 555
    },
    Order: [String], // replace it with Order Model
    Comments: [String] // replace it with Comment Model
});

const User = mongoose.model('User', UserSchema);

