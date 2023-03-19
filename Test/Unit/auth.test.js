const {User} = require('../../model/User');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
    it('should populate req.user', async () => {
        const user = new User({
            name: 'sss',
            username: '145876',
            number: '03715468879',
            email: '56489465156mknmknj@gmail.com',
            password: 'sdsadasdsd13213',
            address: 'sdasdasdasdasd',
            isAdmin: false
        });
        await user.save();
        const findUser = await User.findOne({username: '145876'});
        token = findUser.getJwt();

        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {};
        const next = jest.fn();

        auth(req, res, next);
    })
})