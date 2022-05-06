import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../app.js';
const User = require("../model/User");
const bcrypt = require("bcryptjs");

jest.mock('../model/User.js');

describe("POST user/signup", () => {
    describe("given a firstname, lastname, unique email, and password", () => {

        test("should save firstname, lastname, email, and password to the database", async () => {

            //need to mock user.save(), but cannot reach it

        })

        test("should specify json in content type header", async () => {
            //simulate uniqueness of user email in database
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 0;
            })

            const response = await request(app).post("/user/signup").send({
                firstname: "TestFirst",
                lastname: "TestLast",
                email: "TestEmail",
                password: "TestPass"
            })

            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })

        test("should respond with a 200 status code for success", async () => {

            // stub User.findOne to return null
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 0;
            })

            const response = await request(app).post("/user/signup").send({
                firstname: "TestFirst",
                lastname: "TestLast",
                email: "TestEmail",
                password: "TestPass"
            })

            //response status code = 200
            expect(response.statusCode).toBe(200);
        })

        test("should respond with a json object containing success message and token", async () => {

            // stub User.findOne to return null
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return 0;
            })

            const response = await request(app).post("/user/signup").send({
                firstname: "TestFirst",
                lastname: "TestLast",
                email: "TestEmail",
                password: "TestPass"
            })
            expect(response.body.message).toEqual("Signed Up!");
            expect(response.body.token).toBeDefined();
        })

    })
    describe("missing firstname, lastname, email, or password", () => {
        test("should respond with status code 400 on user error, and missing property key", async () => {

            //sound request object
            const req = {
                firstname: "TestFirst",
                lastname: "TestLast",
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
                const response = await request(app).post("/user/signup").send(
                    reqCopy
                )

                //verify a failure occurred
                expect(response.statusCode).toBe(400);

                //verify the deleted property is what caused the fail
                expect(response.body.errors[0].param).toEqual(key)
            }
        })
    })
    describe("User email address already registered.", () => {
        test("Should return 400, and error message 'User Already Exists'.", async () => {

            //stub mongoDB findOne return of true
            jest.spyOn(User, 'findOne').mockImplementation(() => {
                return { userID: 1 }
            })

            //valid request
            const response = await request(app).post("/user/signup").send({
                firstname: "TestFirst",
                lastname: "TestLast",
                email: "TestEmail",
                password: "TestPass"
            })

            //400 status code
            expect(response.statusCode).toBe(400);

            //error message
            expect(response.body.msg).toEqual("User Already Exists")
        })

    })
})