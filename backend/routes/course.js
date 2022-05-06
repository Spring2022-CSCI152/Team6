// Filename : class.js

const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

//json web token
const jwt = require('jsonwebtoken');

//needed to find mongodb document by id
const ObjectId = require('mongodb').ObjectId;

const Class = require("../model/Course");

const User = require("../model/User")


//uses the user id stored in the json web token of the request header to create a mongoDB id object for search
const makeObjectIdFromReq = (req) => {

  //grab the token from the header
  const rawToken = req.headers.authorization;

  //separate the token code from the "bearer" prefix
  const token = rawToken.split(' ')[1];

  //decode jwt
  const payload = jwt.verify(token, "randomString");

  //return the stored id of decoded jwt
  const userId = payload.user.id;

  //create mongoDB id type for search
  return new ObjectId(userId);
}



router.post(
  "/addClass",
  [
    check("className", "Please enter a valid className").isLength({
      min: 1,
    }),
    check("Description", "Please enter a valid Description").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      classNameAb,
      className,
      Prerequisites,
      Description,
      Units,
      TermTypicallyOffered,
    } = req.body;
    try {
      var course = await Class.findOne({
        $or:
          [{ classNameAb },
          { className }]
      }).sort({ classNameAb: 1 }).collation({ locale: "en_US", numericOrdering: true });
      if (course) {
        return res.status(400).json({
          msg: "Class Already Exists",
        });
      }

      course = new Class({
        classNameAb,
        className,
        Prerequisites,
        Description,
        Units,
        TermTypicallyOffered,
      });

      await course.save();

      res.status(200).json({
        message: "Course Created!",
        course
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Adding");
    }
  }
);

router.post(
  "/search",
  async (req, res) => {
    // const { classNameAb, className  } = req.body;
    const query = req.body;
    try {
      var courses = await Class.find((query.specific) ? {
        $or:
          [{ "classNameAb": query.specific },
          { "className": query.specific }]
      }
        : { $text: { $search: query.general } })
        .sort({ classNameAb: 1 }).collation({ locale: "en_US", numericOrdering: true });
      if (courses.toString() == "") {
        return res.status(400).json({
          message: "Course Not Exist",
        });
      }
      res.status(200).json({
        message: "Course Founded!",
        courses
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    var courses = await Class.find().sort({ classNameAb: 1 }).collation({ locale: "en_US", numericOrdering: true });
    if (!courses)
      return res.status(400).json({
        message: "There is no course",
      });

    res.status(200).json({
      message: "All courses Founded!",
      courses
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post(
  "/searchWithTermFilter",
  async (req, res) => {
    console.log(req.body);
    // const { classNameAb, className, TermTypicallyOffered  } = req.body;
    const { query, TermTypicallyOffered } = req.body;
    // const query = req.body;
    // console.log(classNameAb,className);
    // if(!classNameAb || !className)
    if (!query) { //case of "View All" filtered by selected term(s)
      // console.log("hi");
      try {
        var courses = await Class.find({
          TermTypicallyOffered
        }).sort({ classNameAb: 1 }).collation({ locale: "en_US", numericOrdering: true });
        console.log(courses.toString());
        if (courses.toString() == "") {
          // console.log("hi");
          return res.status(400).json({
            message: "Course Not Exist",
          });
        }
        res.status(200).json({
          message: "Course Founded!",
          courses
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error",
        });
      }
    }
    else {
      //case of non-empty search string filtered by selected term(s)
      try {
        var courses = await Class.find({
          // $or:
          // [{classNameAb},
          // {className}],
          $text: { $search: query },
          TermTypicallyOffered
        }).sort({ classNameAb: 1 }).collation({ locale: "en_US", numericOrdering: true });
        if (courses.toString() == "") {
          return res.status(400).json({
            message: "Course Not Exist",
          });
        }
        res.status(200).json({
          message: "Course Founded!",
          courses
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error",
        });
      }
    }
  }
);

router.put("/update", async (req, res) => {

  //verify that user has privilege to modify course information
  //unique document id for mongoDB collection
  const objId = makeObjectIdFromReq(req);

  try {
    //search mongoDB for the user's document by its id
    const user = await User.findById({ objId },

      //get rid of unnecessary data (avoid stamp coupling)
      { role: 1 });

    //case of missing user record
    if (!user) return res.status(400).json({ message: "Failed to find user", user: "" })

    //case of wrong privilege level
    if (user.role != "admin") return res.status(400).json({ message: "User lacks privilege to modify courses." })

    try {
      //use unique course id to find document (record), and update
      const result = Class.updateOne({ classNameAb: req.body.classNameAb }, { $set: req.body });

      //return respective code and message
      if (!result) return res.status(400).json({ message: "Failed to update course" })

      res.status(200).json({ message: "Successfully updated course" })

    } catch (error) {
      //case of mongoDB error
      console.log(error)
      res.status(500).json({ error: "MongoDB Class.updateOne() Threw Error" });
    }

  } catch (err) {
    //case of mongoDB error

    console.log(err);

    res.status(500).json({ error: "MongoDB User.findById() Threw Error" });
  }

})

module.exports = router;
