const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const access_key = process.env.access_key;


async function authToken(req, res, next)
{
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
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
    });

    if(!userData.id)
    {
        return res.status(200).json({code: 'failed', message: 'Invalid Token', data:{}});
    }

    let rec = await mongoose.model('User').findOne({'email' : userData.email, 'deleted' : false});

    if(rec)
    {
        req.user = rec;
        req.user.is_admin = false;
        next();
    }
    else
    {
        return res.status(200).json({code: 'failed', message: 'Invalid Token', data:{}});
    }
}

module.exports = { authToken };