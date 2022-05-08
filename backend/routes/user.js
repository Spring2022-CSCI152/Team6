// Filename : user.js

const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

//connection to mongoDB collection "users"
const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

//signup
router.post(
  "/signup",
  [
    check("firstname", "Please enter a valid password").isLength({
      min: 1
    }),
    check("lastname", "Please enter a valid password").isLength({
      min: 1
    }),
    check("email", "Please enter a valid email").isLength({
      min: 1
    }),
    check("password", "Please enter a valid password").isLength({
      min: 1
    }),

  ],

  async (req, res) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      firstname,
      lastname,
      email,
      password,
      role,
    } = req.body;

    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        firstname,
        lastname,
        email,
        password,
        role,
      });

      //hash password (this should be done client side instead to avoid password exposure over unencrypted connections)
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save new User document to users collection
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      //json web token
      jwt.sign(
        payload,
        "randomString", {
        expiresIn: 10000
      },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            message: "Signed Up!",
            token,
            role: user.role,
          });
        }
      );
    } 
    
    // server error
    catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

//login
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isLength({
      min: 1
    }),
    check("password", "Please enter a valid password").isLength({
      min: 1
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password!"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            message: "Logged in!",
            token,
            role: user.role,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

module.exports = router;