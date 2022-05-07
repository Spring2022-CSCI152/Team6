
//query mongoDB collection: Users
const User = require('../model/User')

//verify json web token
const jwt = require('jsonwebtoken');


//uses the user id stored in the json web token of the request header to create a mongoDB id object for search
const getUser_idFromReq = (req) => {

    //grab the token from the header
    const rawToken = req.headers.authorization;

    //separate the token code from the "bearer" prefix
    const token = rawToken.split(' ')[1];

    //decode jwt
    const payload = jwt.verify(token, "randomString");

    //return the stored id of decoded jwt
    return payload.user.id;
}

const verifyAdminRole = async (user_id) => {

    try {
        //search mongoDB for the user's document by its id
        const user = await User.findById(user_id,

            //only get role value (avoid stamp coupling)
            { role: 1 });

        //case of missing user record
        // if (!user) return res.status(400).json({ message: "Failed to find user", user: "" })
        if (!user) return 0;

        //case of wrong privilege level
        // if (user.role != "admin") return res.status(400).json({ message: "User lacks privilege to modify courses." })
        if (user.role != "admin") return 0;

        return 1;

    } catch (err) {
        //case of mongoDB error

        console.log(err);

        // res.status(500).json({ error: "MongoDB User.findById() Threw Error" });
    }
}

exports.getUser_idFromReq = getUser_idFromReq;
exports.verifyAdminRole = verifyAdminRole;