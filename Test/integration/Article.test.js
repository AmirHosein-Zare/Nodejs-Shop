const {Article} = require('../../model/Article');
const request = require('supertest');
let server;

describe('article integration test', () => {
    beforeEach(() => {server = require('../../index')});
    afterEach( async () => {
        server.close();
        await Article.remove({});
    })

    describe('GET /', () => {
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
})