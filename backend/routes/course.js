// Filename : class.js

const express = require("express");
const { check, validationResult } = require("express-validator/check");
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
      let course = await Class.findOne({
        className,
      });
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

      const payload = {
        course: {
          id: course.id,
        },
      };

      res.status(200).json({
        message: "Course Created!",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Adding");
    }
  }
);

router.post(
  "/findCourse",
  [
    check("className", "Please enter a valid className").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { className } = req.body;
    try {
      let course = await Class.findOne({
        className,
      });
      if (!course)
        return res.status(400).json({
          message: "Course Not Exist",
        });

      const payload = {
        course: {
          id: course.id,
        },
      };
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;
