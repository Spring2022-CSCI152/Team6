

import 'regenerator-runtime/runtime';
import app from '../app.js';
import request from 'supertest';
import User from '../model/User';

//to stub
const jwt = require('jsonwebtoken');

//mocks

// bypasses the jwt requirement check in '../app.js'
jest.mock('express-jwt', () => {
    return () => {
        return function (req, res, next) { next(); }
    }
})

//mongoDB mock
jest.mock('../model/User.js')

const token = "Bearer RandomCharacters";

describe("Get /profile", () => {
    describe("Given JWT with valid user id", () => {
        it("should decode web token", async () => {

            //stub token verify
            const jwtVerify = jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });

            const response = await request(app).get("/profile").set({ authorization: token });


            expect(jwtVerify).toHaveBeenCalled();
        })
        test("should query database for user's existence", async () => {

            //stub token verify
            jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });

            await request(app).get("/profile").set({ authorization: token });


            expect(User.findOne).toHaveBeenCalled();
        });
        test("should return status code 200", async () => {

            //stub token verify
            jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });

            const response = await request(app).get("/profile").set({ authorization: token });


            expect(response.statusCode).toBe(200);
        })
        test("should specify json in response content type header", async () => {

            //stub token verify
            jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });

            const response = await request(app).get("/profile").set({ authorization: token });


            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
})

describe("Post /profile", () => {
    test.todo("stuff")
})