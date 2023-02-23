const express = require('express');
const router = express.Router();
const {Star} = require('../model/Star');

// get all api
router.get('/', async(req, res) => {
    const stars = await Star.find();
    if(!stars) return res.status(404).send('Stars Not Found');

    res.send(stars);
});

