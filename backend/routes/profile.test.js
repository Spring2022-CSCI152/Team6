import 'regenerator-runtime/runtime';
// const jwt = require('jsonwebtoken');
import app from '../app.js';
import request from 'supertest';

// jest.mock('jsonwebtoken')
// jest.mock('express-jwt')
// jest.mock('express-jwt', (req, res, next) => {
// })

// jest.mock('express-jwt');
// const jwtExpress = require('express-jwt');

jest.mock('express-jwt', () => {
    return () => {
        return function (req, res, next) { next(); }
    }
})

// jest.mock

// jwtExpress.mockImplementation((req, res) => {})

describe("Given JWT with embedded user id", () => {
    it("should decode web token", async () => {

        // const jwtVerify = jest.spyOn(jwt, 'verify');

        const response = await (await request(app).get("/profile")).send();


        // expect(response).

        expect(jwtVerify).toHaveBeenCalled();

    })
    test.todo("should query database for user's existence");
    test.todo("should return that user's attributes")
})