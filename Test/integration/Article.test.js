const {Article} = require('../../model/Article');
const request = require('supertest');
let server;

describe('article integration test', () => {
    beforeEach(() => {server = require('../../index')});
    afterEach( async () => {
        server.close();
        await Article.remove({});
    })
})