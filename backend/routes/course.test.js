import 'regenerator-runtime/runtime'
import request from 'supertest';
import app from '../app';
import Class from '../model/Course';

const mongoose = require("mongoose");

jest.mock("../model/Course.js")

const queryMock = new mongoose.Query();

const courseMock = {
    findOne: jest.fn(() => courseMock),
    sort: jest.fn(() => courseMock),
    collation: jest.fn(() => courseMock),
};


describe("Post /course/addClass", () => {

    const data = {
        classNameAb: "classNameAbTest",
        className: "classNameTest",
        Prerequisites: "prerequisitesTest",
        Description: "descriptionTest",
        Units: "unitsTest",
        TermTypicallyOffered: "termTest"
    }

    test("should return status code 400 for lack of class name or description, and missing paramater", async () => {

        const data = {
            className: "classNameTest",
            Description: "descriptionTest",
        }

        for (const key in data) {
            const dataCopy = { ...data };
            delete dataCopy[key];

            const response = await request(app).post("/course/addClass").send(dataCopy);

            expect(response.statusCode).toBe(400);
            expect(response.body.errors[0].param).toEqual(key);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        }
    })

    test("should return status code 400 in attempt to add duplicate course.", async () => {

        //stubs the mongoose chain
        jest.spyOn(Class, 'findOne').mockReturnValue(queryMock);
        jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
        jest.spyOn(queryMock, 'collation').mockReturnValue(1);

        const response = await request(app).post("/course/addClass").send(data);

        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toEqual("Class Already Exists");
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })

    test("should return status code 200, and success message on successful course addition", async () => {

        jest.spyOn(Class, 'findOne').mockReturnValue(queryMock);
        jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
        jest.spyOn(queryMock, 'collation').mockReturnValue(0);

        const response = await request(app).post("/course/addClass").send(data);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Course Created!");
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })

    test("should return status code 500, and error message on server error", async () => {

        Class.findOne.mockImplementation(() => {
            throw new Error();
        })

        const response = await request(app).post("/course/addClass").send(data);

        expect(response.statusCode).toBe(500);
        expect(response.text).toEqual("Error in Adding");
    })


})

describe("Post /course/search", () => {

    jest.clearAllMocks();
    jest.resetAllMocks();

    describe("given course name or abbreviation with no db matches", () => {
        test("should return status code 400, and message 'Course Not Exist' in json", async () => {

            //stubs the mongoose chain
            jest.spyOn(Class, 'find').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'collation').mockReturnValue("");


            const response = await request(app).post("/course/search").send();

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual("Course Not Exist")
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
    describe("given course name or abbreviation with at least one db match", () => {
        test("should return status code 200, and message of 'Course Found!' in json.", async () => {

        })
    })
})

describe("Get /course/", () => {

})

describe("Post /course/searchWithTermFilter", () => {

})