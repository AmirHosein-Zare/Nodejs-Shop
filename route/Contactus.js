const express = require('express');
const router = express.Router();
const {Contactus, isValidContactus} = require('../model/Contactus');

//get all contactus api
router.get('/', async(req, res) => {
    const messages = await Contactus.find();
    if(!messages) return res.status(404).send('Messages Not Found');

    res.send(messages);
})

// get contact us by id api
router.get('/:id', async(req, res) => {
    const message = await Contactus.findById(req.params.id);
    if(!message) return res.status(404).send('Message Not Found');

    res.send(message);
})

// post Contact us api
router.post('/', async(req, res) => {
    const {error} = isValidContactus(req.body);
    if(error) return res.status(400).send('Not Valid Data');

    const message = new Contactus({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    await message.save();
    res.send(message);
});

// put api
router.put('/:id', async(req, res) => {
    const message = await Contactus.findById(req.params.id);
    if(!message) return res.status(404).send('Message Not Found');

    const {error} = isValidContactus(req.body);
    if(error) return res.status(400).send('Not Valid Data');

    const contactus = await Contactus.findByIdAndUpdate(req.params.id, {
        $set:{
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }
    }, {new: true});

    res.send(contactus);
});

// delete api
router.delete('/:id', async(req, res) => {
    const message = await Contactus.findByIdAndRemove(req.params.id);
    if(!message) return res.status(404).send('Message Not Found');

    res.send(message);
});

module.exports = router;