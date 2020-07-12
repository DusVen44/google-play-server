const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Googe Play Server TEST', () => {
    it('Should return a message from GET/apps', () => {
        return supertest(app)
            .get('/apps')
            .expect('Content-Type', /json/);
    })

    it('Should return 400 response if sort is NOT "Rating" or "App"'), () => {
        return supertest(app)
            .get('/apps')
            .query(sort)
            .expect('Content-Type', /json/);
    }
})