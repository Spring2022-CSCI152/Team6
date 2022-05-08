

import 'regenerator-runtime/runtime';
import app from '../app.js';
import request from 'supertest';
import User from '../model/User';

//to stub verify
const jwt = require('jsonwebtoken');

//mocks

// bypasses the jwt requirement check in '../app.js'
jest.mock('express-jwt', () => {
    return () => {
        return function (req, res, next) { next(); }
    }
})

//mongoDB mock
jest.mock('../model/User.js');

const token = "Bearer RandomCharacters";

describe("Route: /profile", () => {
    beforeEach(() => {

        //stub token verify
        jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    describe("Get request", () => {

        describe("Given JWT with valid user id", () => {
            it("should decode web token", async () => {

                //stub token verify
                const jwtVerify = jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });

                await request(app).get("/profile").set({ authorization: token });


                expect(jwtVerify).toHaveBeenCalled();
            })
            test("should query database for user's existence", async () => {

                await request(app).get("/profile").set({ authorization: token });


                expect(User.findById).toHaveBeenCalled();
            });
            test("should return status code 200", async () => {

                //stub successful mongoDB document find
                User.findById.mockReturnValue(1);

                const response = await request(app).get("/profile").set({ authorization: token });


                expect(response.statusCode).toBe(200);
            })
            test("should specify json in response content type header", async () => {

                //stub successful mongoDB document find
                User.findById.mockReturnValue(1);

                const response = await request(app).get("/profile").set({ authorization: token });


                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            })
        })

        describe("Invalid user id in JWT", () => {

            test("Should return status code 400", async () => {

                //stub mongoDB document find failure
                User.findById.mockReturnValue(0);

                const response = await request(app).get("/profile").set({ authorization: token });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toEqual("Failed to find user");
            })

        })

        describe("MongoDB throws error.", () => {

            test("should return status code 500, and error message.", async () => {

                User.findById.mockImplementation(() => {
                    throw new Error();
                })

                const response = await request(app).get("/profile").set({ authorization: token });

                expect(response.statusCode).toBe(500);
                expect(response.body.error).toEqual("MongoDB User.findOne() Threw Error")
            })



        })
    })

    describe("Put request. Given JWT with valid user id.", () => {

        describe("Valid user attributes to update", () => {

            test("should decode web token", async () => {

                //stub token verify
                const jwtVerify = jest.spyOn(jwt, 'verify').mockReturnValue({ user: "TestID" });

                await request(app).put("/profile").set({ authorization: token });


                expect(jwtVerify).toHaveBeenCalled();
            })

            test("should return status code 200", async () => {

                //stub successful mongoDB document update
                User.findByIdAndUpdate.mockReturnValue(1);

                const response = await request(app).put("/profile").set({ authorization: token });

                expect(response.statusCode).toBe(200);
            })
        })
        describe("Failure to update mongoDB document.  Invalid user attributes provided.", () => {
            test("Return status code 400, and error message", async () => {

                //stub mongoDB modify failure
                User.findByIdAndUpdate.mockReturnValue(0);

                const response = await request(app).put("/profile").set({ authorization: token });

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toEqual("Failed to update user");
            })
        })
        describe("MongoDB error", () => {
            test("should return status code 500, and error message", async () => {

                //stub error throw on mongoDB document update attempt
                User.findByIdAndUpdate.mockImplementation(() => {
                    throw new Error();
                })

                const response = await request(app).put("/profile").set({ authorization: token });

                expect(response.statusCode).toBe(500);
                expect(response.body.error).toEqual("MongoDB User.updateOne() Threw Error");
            })
        })
    })
})
