import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from './app.js';
 


describe("POST /signup", () => {
    describe("given a username and password", () => {
        //should save username and password to the database
        //should respond with a json object containing the user id
        test("should respond with a 200 status code on success", async () => {
            const response = await request(app).post("user/signup").send({
                firstname: "TestFirst",
                lastname: "TestLast",
                email: "TestEmail",
                password: "TestPass"
            })
            expect(response.statusCode).toBe(200);
        })
    })
    describe("missing username and password", () => {
        //should respond with status code 400

    })
})