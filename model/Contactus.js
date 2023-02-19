const mongoose = require('mongoose');
const Joi = require('joi');

// regular expression for email
let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const ContactusSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        trim: true,
        required: true,
        match: regex
    },
    message:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Contactus = mongoose.model('Contactus', ContactusSchema);

