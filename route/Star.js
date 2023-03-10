const express = require('express');
const router = express.Router();
const {Star, isValidStar} = require('../model/Star');

// get all api
router.get('/', async(req, res) => {
    const stars = await Star.find();
    if(!stars) return res.status(404).send('Stars Not Found');

    res.send(stars);
});

// get by id api
router.get('/:id', async(req, res) => {
    const star = await Star.findById(req.params.id);
    if(!star) return res.status(404).send('star Not Found');

    res.send(star);
});

// post api
router.post('/', async(req, res) => {
    const {error} = await isValidStar(req.body);
    if(error) return res.status(400).send('Not Valid Data');

    const star = new Star({
        product: req.body.productId
    });

    await star.save();
});

// put api
router.put('/:id', async(req, res) => {
    const star = await Star.findById(req.params.id);
    if(!star) return res.status(404).send('Star Not Found');
    
    const newStar = await Star.findByIdAndUpdate(req.params.id, {
        $set:{
            average: req.body.average
        }
    }, {new: true});

    res.send(newStar);
});

// delete api
router.delete('/:id', async(req, res) => {
    const star = await Star.findByIdAndRemove(req.params.id);
    if(!star) return res.status(404).send('Star Not Found');

    res.send(star);
})

module.exports = router;