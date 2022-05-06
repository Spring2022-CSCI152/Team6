import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../app.js';
const User = require("../model/User");
const bcrypt = require("bcryptjs");

jest.mock('../model/User.js');

describe("POST user/login", () => {

    //successes
    describe("given a registered email, and password", () => {

        test("should specify json in content type header", async () => {

            //stub email found in database to return true
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 1;
            })

            //stub password comparison to return true
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
                return 1;
            })

            const response = await request(app).post("/user/login").send({
                email: "TestEmail",
                password: "TestPass"
            })

            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })

        test("should respond with a 200 status code for success", async () => {

            // stub User.findOne to return null
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 1;
            })

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
                return 1;
            })

            const response = await request(app).post("/user/login").send({
                email: "TestEmail",
                password: "TestPass"
            })

            //response status code = 200
            expect(response.statusCode).toBe(200);
        })

        test("should respond with a json object containing success message and token", async () => {

            // stub User.findOne to return null
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 1;
            })

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
                return 1;
            })

            const response = await request(app).post("/user/login").send({
                email: "TestEmail",
                password: "TestPass"
            })

            expect(response.body.message).toEqual("Logged in!");
            expect(response.body.token).toBeDefined();
        })

    })

    //failures
    describe("missing email, or password", () => {
        test("should respond with status code 400 (for user error), and error array that lists missing property key(s)", async () => {

            //sound request object
            const req = {
                email: "TestEmail",
                password: "TestPass"
            }

            //make request to server for each property in request object
            for (const key in req) {

                //make copy of request data
                const reqCopy = { ...req };

                //delete a property from the sound request copy.
                delete reqCopy[key];

                //contact server
                const response = await request(app).post("/user/login").send(
                    reqCopy
                )

                //verify a failure occurred
                expect(response.statusCode).toBe(400);

                //verify the deleted property is what caused the fail
                expect(response.body.errors[0].param).toEqual(key)
            }
        })
    })
    describe("Unregistered email address.", () => {
        test("Should return status 400, and message 'User Not Exist'.", async () => {

            //stub mongoDB findOne return of true
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 0
            })

            //valid request
            const response = await request(app).post("/user/login").send({
                email: "TestEmail",
                password: "TestPass"
            })

            //400 status code
            expect(response.statusCode).toBe(400);

            //error message
            expect(response.body.message).toEqual("User Not Exist")
        })
    })
    describe("Incorrect password.", () => {
        test("Should return status 400, and message 'Incorrect Password!'.", async () => {

            //stub mongoDB findOne return of true
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 1
            })

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
                return 0;
            })

            //valid request
            const response = await request(app).post("/user/login").send({
                email: "TestEmail",
                password: "TestPass"
            })

            //400 status code
            expect(response.statusCode).toBe(400);

            //error message
            expect(response.body.message).toEqual("Incorrect Password!")
        })
    })
})