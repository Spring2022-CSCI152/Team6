/*Back end express route (script) to grab currently logged in user's profile information so that the front end can load in the correct attributes.
*/

//prerequisite to express.Router()
const express = require('express');

//enables the router.get() function
const router = express.Router();

//json web token
const jwt = require('jsonwebtoken');

//Used mongodb to call findOne
const User = require('../model/User');

//needed to find mongodb document by id
const ObjectId = require('mongodb').ObjectId;


//get logged-in user's attributes
router.get('/', async (req, res) => {

    //grab the token from the header
    const rawToken = req.headers.authorization;

    //separate the token code from the "bearer" prefix
    const token = rawToken.split(' ')[1];

    //decode jwt
    const payload = jwt.verify(token, "randomString");

    //grab the stored id of decoded jwt
    const userId = payload.user.id;

    //create mongoDB id type for search
    const objId = new ObjectId(userId);

    //search mongoDB for the user's document by its id
    const user = await User.findOne({ _id: objId },

        //get rid of unnecessary data (avoid stamp coupling)
        { _id: 0, password: 0, createdAt: 0, __v: 0 });

    //return user's information to frontend
    res.json({ user: user });
});

//modify logged-in user's attributes
router.put('/', async (req, res) => {
    //grab the token from the header
    const rawToken = req.headers.authorization;

    //separate the token code from the "bearer" prefix
    const token = rawToken.split(' ')[1];

    //decode jwt
    const payload = jwt.verify(token, "randomString");

    //grab the stored id of decoded jwt
    const userId = payload.user.id;

    //create mongoDB id type for search
    const objId = new ObjectId(userId);

    //search mongoDB for the user's document by its id
    await User.updateOne({ _id: objId },
        {
            //update all properties in request
            $set: req.body

        })

    const user = await User.findOne({ _id: objId },
        
        //get rid of unnecessary data (avoid stamp coupling)
        { _id: 0, password: 0, createdAt: 0, __v: 0 });

    //return user's information to frontend
    res.json({ user: user });
})

module.exports = router;