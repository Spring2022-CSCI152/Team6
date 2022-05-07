import 'regenerator-runtime/runtime'
import request from 'supertest';
import app from '../app';
import Class from '../model/Course';
import Utility from './utility'

//to stubs Mongoose chain
const mongoose = require("mongoose");
const queryMock = new mongoose.Query();

//mocks
jest.mock("../model/Course.js")
jest.mock('./utility.js')

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

    // describe("given course name or abbreviation with no db matches", () => {
    //     test("should return status code 400, and message 'Course Not Exist' in json", async () => {

    //         //stubs the mongoose chain
    //         jest.spyOn(Class, 'find').mockReturnValue(queryMock);
    //         jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
    //         jest.spyOn(queryMock, 'collation').mockReturnValue("");


    //         const response = await request(app).post("/course/search").send();

    //         expect(response.statusCode).toBe(400);
    //         expect(response.body.message).toEqual("Course Not Exist")
    //         expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    //     })
    // })

    describe("given course name or abbreviation with at least one db match", () => {
        test("should return status code 200, and message of 'Course Found!' in json.", async () => {

            //stubs the mongoose chain
            jest.spyOn(Class, 'find').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'collation').mockReturnValue(1);


            const response = await request(app).post("/course/search").send();

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual("Course Found!")
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
    describe("given mongoDB error", () => {
        test("should return status code 500, and message 'Server Error' in json", async () => {

            //stubs the mongoose chain
            jest.spyOn(Class, 'find').mockImplementation(() => {
                throw new Error();
            })


            const response = await request(app).post("/course/search").send();

            expect(response.statusCode).toBe(500);
            expect(response.body.message).toEqual("Server Error")
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })

})

describe("Get /course/ - route responsible for getting all courses at once", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    // describe("given no courses in mongoDB collection", () => {
    //     test("should return status code 400, and message 'There is no course'.", async () => {

    //         //stubs the mongoose chain
    //         jest.spyOn(Class, 'find').mockReturnValue(queryMock);
    //         jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
    //         jest.spyOn(queryMock, 'collation').mockReturnValue(0);

    //         const response = await request(app).get("/course").send();

    //         expect(response.statusCode).toBe(400);
    //         expect(response.body.message).toEqual('There are no courses');
    //         expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    //     })
    // })

    describe("given more than one course in mongoDB collection", () => {
        test("should return status code 200, and message 'All courses found!' in json", async () => {

            //stubs the mongoose chain
            jest.spyOn(Class, 'find').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'collation').mockReturnValue(1);

            const response = await request(app).get("/course").send();

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual('All courses found!');
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
    describe("given mongoDB server error", () => {
        test("should return status code 500, and message 'Server Error' in json", async () => {

            jest.spyOn(Class, 'find').mockImplementation(() => {
                throw new Error();
            })

            const response = await request(app).get("/course").send();

            expect(response.statusCode).toBe(500);
            expect(response.body.message).toEqual('Server Error');
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
})

describe("Post /course/searchWithTermFilter", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    // test("should dynamically create search query based on provided criteria", async () => {
    //     const criteria = searchQuery ? { $text: { $search: searchQuery }, TermTypicallyOffered } : { TermTypicallyOffered }

    //     //stubs the mongoose chain
    //     const classFindCall = jest.spyOn(Class, 'find').mockReturnValue(queryMock);
    //     jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
    //     jest.spyOn(queryMock, 'collation').mockReturnValue(1);

    //     const response = await request(app).post("/course/searchWithTermFilter").send();
    // })

    test("should query database", async () => {

        //stubs the mongoose chain
        const classFindCall = jest.spyOn(Class, 'find').mockReturnValue(queryMock);
        jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
        jest.spyOn(queryMock, 'collation').mockReturnValue(1);

        await request(app).post("/course/searchWithTermFilter").send();

        expect(classFindCall).toHaveBeenCalled();
    })

    describe("give: no server errors", () => {
        test("should return status code 200, and success message 'Course Found!' in json", async () => {

            //stubs the mongoose chain
            jest.spyOn(Class, 'find').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'sort').mockReturnValue(queryMock);
            jest.spyOn(queryMock, 'collation').mockReturnValue(1);

            const response = await request(app).post("/course/searchWithTermFilter").send();

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual('Course Found!')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })

    describe("given: server errors", () => {
        test("should return status code 500, and error message 'Server Error' in json", async () => {

            //stubs the mongoose chain
            jest.spyOn(Class, 'find').mockImplementation(() => {
                throw new Error();
            })

            const response = await request(app).post("/course/searchWithTermFilter").send();

            expect(response.statusCode).toBe(500);
            expect(response.body.message).toEqual('Server Error');
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })

    })
})

describe("Put /course/update", () => {
    test("should get user id from token", async () => {

        const userIdFromToken = jest.spyOn(Utility, "getUser_idFromReq");

        await request(app).put("/course/update").send();

        expect(userIdFromToken).toHaveBeenCalled();
    })
    test("should check user's privilege level in mongoDB", async () => {

        const userPrivilegeCheck = jest.spyOn(Utility, "verifyAdminRole");

        await request(app).put("/course/update").send();

        expect(userPrivilegeCheck).toHaveBeenCalled();
    })

    describe("given user without admin role", () => {
        test("should return status code 400, and json message 'Failed to verify user role.'", async () => {

            jest.spyOn(Utility, "verifyAdminRole").mockReturnValue(0);

            const response = await request(app).put("/course/update").send();

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual('Failed to verify user role.');
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
    describe("given user with admin role", () => {
        test("should query mongoDB collection Class with findByIdAndUpdate()", async () => {

            //stub successful check
            jest.spyOn(Utility, "verifyAdminRole").mockReturnValue(1);

            //spy mongodb call
            const classUpdateCall = jest.spyOn(Class, 'findByIdAndUpdate');

            await request(app).put("/course/update").send();

            expect(classUpdateCall).toHaveBeenCalled();
        })
        describe("given invalid course id", () => {
            test("should return status code 400, and json message 'Failed to update course.  Could not find it.'", async () => {

                //stub successful check
                jest.spyOn(Utility, "verifyAdminRole").mockReturnValue(1);

                //stub unsuccessful mongodb call
                jest.spyOn(Class, 'findByIdAndUpdate').mockReturnValue(0);

                const response = await request(app).put("/course/update").send();

                expect(response.statusCode).toBe(400);
                expect(response.body.message).toEqual('Failed to update course.  Could not find it.');
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            })
        })
        describe("given valid course id", () => {
            test("should return status code 200, and json message 'Successfully updated course'.", async () => {
                 
                //stub successful check
                 jest.spyOn(Utility, "verifyAdminRole").mockReturnValue(1);

                 //stub successful mongodb call
                 jest.spyOn(Class, 'findByIdAndUpdate').mockReturnValue(1);
 
                 const response = await request(app).put("/course/update").send();
 
                 expect(response.statusCode).toBe(200);
                 expect(response.body.message).toEqual('Successfully updated course');
                 expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            })
        })
        describe("given mongodb error", () => {
            test("should return status code 500, and json message 'MongoDB Class.findByIdAndUpdate() Threw Error'", async () => {

                //stub successful check
                jest.spyOn(Utility, "verifyAdminRole").mockReturnValue(1);

                //stub error from mongodb call
                jest.spyOn(Class, 'findByIdAndUpdate').mockImplementation(()=>{
                    throw new Error("Mocked Error");
                })

                const response = await request(app).put("/course/update").send();

                expect(response.statusCode).toBe(500);
                expect(response.body.message).toEqual('MongoDB Class.findByIdAndUpdate() Threw Error');
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            })
        })
    })
})