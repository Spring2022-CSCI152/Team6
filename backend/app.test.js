import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from './app.js';



describe("POST user/signup", () => {
    describe("given a username and password", () => {
        //should save username and password to the database
        //should respond with a json object containing the user id
        // test("should respond with a 200 status code on success", async () => {
        //     const response = await request(app).post("/user/signup").send({
        //         firstname: "TestFirst",
        //         lastname: "TestLast",
        //         email: "TestEmail",
        //         password: "TestPass"
        //     })
        //     expect(response.statusCode).toBe(200);
        //     console.log(response.body);
        // })
        // test("should specify json in content type header", async () => {
        //     const response = await request(app).post("/user/signup").send({
        //         firstname: "TestFirst",
        //         lastname: "TestLast",
        //         email: "TestEmail",
        //         password: "TestPass"
        //     })
        //     expect(response.header['content-type']).toEqual(expect.stringContaining("json"));
        // })
    })
    describe("missing firstname, lastname, email, or password", () => {
        test("should respond with status code 400 on user error", async () => {

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
})