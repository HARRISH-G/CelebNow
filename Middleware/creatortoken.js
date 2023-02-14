const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const access_key = "Harrish";


async function authToken(req, res, next)
{
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    
    if(token == null)
    {
        return res.status(200).json({code: 'failed', message: 'Auth is missing', data:{}});
    }
    let userData;
    jwt.verify(token, access_key, (err, user) => {
        if(err)
        {
            return res.status(403).json({code: 'failed', message: 'Invalid Token', data:{}}); 
        }
        userData = user;
        console.log(user)
    });
    console.log(userData)
    if(!userData.username)
    {
        return res.status(200).json({code: 'failed', message: 'Invalid Token', data:{}});
    }

    let rec = await mongoose.model('Creator').findOne({'phone' : userData.username, 'deleted' : false});

    if(rec)
    {
        req.user = rec;
        req.user.is_creator = true;
        next();
    }
    else
    {
        return res.status(200).json({code: 'failed', message: 'Invalid Token', data:{}});
    }
}

module.exports = { authToken };