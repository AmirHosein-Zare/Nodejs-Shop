const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next){
    const token = await req.header('x-header-auth');
    if(!token) return res.status(401).send('Access denied.');

    try{
        const decoded = await jwt.verify(token, config.get('privateKey'))
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('invalid token');
    }
}
