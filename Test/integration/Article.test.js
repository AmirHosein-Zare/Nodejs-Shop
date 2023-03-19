const {Article} = require('../../model/Article');
const request = require('supertest');
const {User} = require('../../model/User');
let server;

describe('article integration test', () => {
    beforeEach(() => {server = require('../../index')});
    afterEach( async () => {
        server.close();
        await Article.remove({});
        await User.remove({});
    })

    describe('GET / ------------------------------', () => {
        it('send valid data and get all data', async () => {
            await Article.insertMany([
                {title: 'numer1', description:'ssssssssssssssssssssssssss'},
                {title: 'numer2', description:'ssssssssssssssssssssssssss'},
                {title: 'numer3', description:'ssssssssssssssssssssssssss'}
            ]);

            const res = await request(server).get('/api/articles');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(article => article.title === 'numer1')).toBeTruthy();
        })

        it('not found any articles and send 404 status code', async () => {
            const res = await request(server).get('/api/articles');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        })
    })

    describe('GET /:id----------------------------', () => {
        it('send a valid id', async () => {
            const article = new Article({
                title: 'number1', 
                description: 'fdfsdfdsfdsfdsfsdf'
            })
    
            await article.save();
    
            const res = await request(server).get('/api/articles/' + article._id);
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'number1');
        })

        it('send invalid id and get 404', async () => {
            const res = await request(server).get('/api/articles/1');

            expect(res.status).toBe(404);
        })
    })

    describe('POST / ----------------------------', () => {
        let token;
        let article = {
            title: 'number1', 
            description: 'sdfsdfretyrtmhgroijghjng'
        }

        let exec = () => {
            return request(server)
                .post('/api/articles')
                .set('x-header-auth', token)
                .send(article);
        }

        it('post valid data & without log in & get 401 status code', async () => {
            token = '';

            const res = await exec();
            
            expect(res.status).toBe(401);
        })

        it('post valid data & not Admin & get 403 status code', async () => {
            const user = new User({
                name: 'sss',
                username: 'sdfer',
                number: '03715468879',
                email: 'sdsdsdd@gmail.com',
                password: 'sdsadasdsd13213',
                address: 'sdasdasdasdasd'
            });

            await user.save();
            const findUser = await User.findOne({username: 'sdfer'});
            token = await findUser.getJwt();


            const res = await exec();
            
            expect(res.status).toBe(403);
        })

        it('post valid data  & get 200 status code', async () => {
            const user = new User({
                name: 'sss',
                username: 'sdfer444',
                number: '03715468879',
                email: 'sdsdsdd@gmail.com',
                password: 'sdsadasdsd13213',
                address: 'sdasdasdasdasd',
                isAdmin: true
            });
            
            await user.save();
            const findUser = await User.findOne({username: 'sdfer444'});
            token = await findUser.getJwt();

            const res = await exec();
            
            expect(res.status).toBe(200);
        })

        it('post invalid data  & get 400 status code', async () => {
            const user = new User({
                name: 'sss',
                username: 'sdfer444',
                number: '09172569874',
                email: 'sdsdsdd@gmail.com',
                password: 'sdsadasdsd13213',
                address: 'sssssssssssssssytftrvuyvt',
                isAdmin: true
            });
            
            await user.save();
            const findUser = await User.findOne({username: 'sdfer444'});
            token = await findUser.getJwt();

            article = {
                title: 'number1', 
                description: 1
            }

            const res = await exec();

            expect(res.status).toBe(400);
        })
    })

    describe('PUT /:id--------------------------', () => {
        let token;
        const newArticle = {
            title: 'number5428',
            description: 'dfdsfdsfdsfdsfdsfsdfsdfdsf'
        }
        let findArticle;
        let article;

        beforeEach( async () => {
            const user = new User({
                name: 'sss',
                username: '145876',
                number: '03715468879',
                email: '56489465156mknmknj@gmail.com',
                password: 'sdsadasdsd13213',
                address: 'sdasdasdasdasd',
                isAdmin: false
            });

            article = new Article({
                title: 'number1', 
                description: 'sdfsdfretyrtmhgroijghjng'
            })

            await article.save();
            findArticle = await Article.findOne({title: 'number5428'});
            
            await user.save();
            const findUser = await User.findOne({username: '145876'});
            token = findUser.getJwt();
        })

        let exec = async () => {
            return await request(server)
                .put('/api/articles/' + findArticle._id)
                .set('x-header-auth', token)
                .send(newArticle);
        }

        it('put article without log in & 401 status code', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        })

        it('put article when isAdmin is false & 403 status code', async () => {
            const res = await exec();

            expect(res.status).toBe(403);
        })

        it('put article with admin & 200 status code', async () => {
            const user = new User({
                name: 'sss',
                username: 'aws',
                number: '03715468879',
                email: '56489465156mknmknj@gmail.com',
                password: 'sdsadasdsd13213',
                address: 'sdasdasdasdasd',
                isAdmin: true
            });

            const findUser = await User.findOne({username: 'aws'});
            token = findUser.getJwt();

            const res = await exec();

            expect(res.status).toBe(200);
        })

        it('put article with invalid objectId & 404 status code', async () => {
            const res = await request(server)
                .put('/api/articles/' + '1')
                .set('x-header-auth', token)
                .send(newArticle);


                expect(res.status).toBe(404);
        })

    })
   
})