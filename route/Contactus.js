const express = require('express');
const router = express.Router();
const {Contactus, isValidContactus} = require('../model/Contactus');

//get all contactus api
router.get('/', async(req, res) => {
    const messages = await Contactus.find();
    if(!messages) return res.status(404).send('Messages Not Found');

    res.send(messages);
})