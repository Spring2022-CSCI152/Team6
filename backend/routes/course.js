// Filename : class.js

const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const Class = require("../model/Course");

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
      var courses = await Class.find((query.specific)?{
        $or:
        [{"classNameAb":query.specific},
        {"className":query.specific}]}
      :{$text: { $search: query.general }})
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
      console.log(req)
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

module.exports = router;
