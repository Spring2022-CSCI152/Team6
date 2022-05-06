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

//get logged-in user's attributes
router.get('/', async (req, res) => {

    //unique document id for mongoDB collection
    const objId = makeObjectIdFromReq(req);

    try {
        //search mongoDB for the user's document by its id
        const user = await User.findOne({ _id: objId },

            //get rid of unnecessary data (avoid stamp coupling)
            { _id: 0, password: 0, createdAt: 0, __v: 0 });

        //case of missing database record
        if (!user) return res.status(400).json({ message: "Failed to find user", user: "" })

        //return user's information to frontend
        res.status(200).json({ user: user });

    } catch (err) {
        //case of mongoDB error

        console.log(err);

        res.status(500).json({ error: "MongoDB User.findOne() Threw Error" });
    }
});

//modify logged-in user's attributes
router.put('/', async (req, res) => {

    //unique document id for mongoDB collection
    const objId = makeObjectIdFromReq(req);

    try {
        //search mongoDB for the user's document by its id
        const result = await User.updateOne({ _id: objId },
            {
                //update all properties in request
                $set: req.body

            }
        );

        if(!result) return res.status(400).json({message:"failed to update user"})

        res.status(200).json({message: "successfully updated user"})

    } catch (error) {

        console.log(error);

        res.status(500).json({error: "MongoDB User.updateOne() Threw Error"});
    }


    // const user = await User.findOne({ _id: objId },

    //     //skip unnecessary data to avoid stamp coupling
    //     { _id: 0, password: 0, createdAt: 0, __v: 0 }
    // );

    // //return user's information to frontend as proof of change
    // res.status(200).json({ user: user });
})

module.exports = router;