
const express = require('express');
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../model/User');


router.get('/test',(req, res) => {
    const decoded = jwt.verify(token, "randomString");
});

module.exports = router;