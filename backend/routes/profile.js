/*Back end express route (script) to grab currently logged in user's profile information so that the front end can load in the correct attributes.
*/

//prerequisite to express.Router()
const express = require('express');

//enables the router.get() function
const router = express.Router();

//get user_id from token inside request
const Utility = require('./utility')

//Use mongodb to call findOneById
const User = require('../model/User');


//get logged-in user's attributes
router.get('/', async (req, res) => {

    //unique document id for mongoDB collection
    const user_id = Utility.getUser_idFromReq(req);

    try {
        //search mongoDB for the user's document by its id
        const user = await User.findById(user_id,

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
    const user_id = Utility.getUser_idFromReq(req);

    try {
        //search mongoDB for the user's document by its id
        const result = await User.findByIdAndUpdate(user_id,
            {
                //update all properties in request
                $set: req.body

            }
        );

        if (!result) return res.status(400).json({ message: "Failed to update user" })

        res.status(200).json({ message: "Successfully updated user" })

    } catch (error) {

        console.log(error);

        res.status(500).json({ error: "MongoDB User.updateOne() Threw Error" });
    }
})

module.exports = router;