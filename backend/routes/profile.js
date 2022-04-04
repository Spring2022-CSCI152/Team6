
const express = require('express');
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../model/User');


router.get('/test',(req, res) => {
    let token = req.headers.tk;
    // const decoded = jwt.verify(token, "randomString");
    res.json({test:55, token:"abc"});
});

module.exports = router;