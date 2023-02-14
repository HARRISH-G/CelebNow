const express = require("express");

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const router = express.Router();
const {createNewOTP,verifyOTP} = require("../Methods/otpGenerator");
const {sms} = require("../Methods/sms")
const User = require("../Models/users");
const { Console } = require("console");

const { authToken } = require("../Middleware/usertoken")

const access_key = "Harrish";



router.post("/register",(req, res)=> {
    try{
        let phone = req.body.phone;
        let 
    }catch(e){

    }
  });

router.post("/sendOtp",async(req, res)=> {
    try{
        let phone = req.body.phone;
        console.log(phone)
        let {fullHash, otp} = createNewOTP(phone)
        console.log(otp ,fullHash)
        let rec = await sms(phone , `Your OTP is ${otp}. it will expire in 5 minutes` );
        console.log("res",rec)
        if(rec === "true"){
            res.send({code:200, message : "otp sent" , data :{hash:fullHash}})
        }else{
            res.send({code:400, message : "otp not sent" , data :{}})
        }
    }catch(err){
        res.send({code:400, message : err , data :{}})
    }
})


router.post("/verifyOtp" ,async (req,res)=>{
    try{
        let otp = req.body.otp;
        let phone = req.body.phone;
        let hash = req.body.hash;
        let verified = verifyOTP(phone,hash,otp);
        console.log(verified)
        if(verified){
            let rec = await User.findOne({phone : phone})
            if(rec.deleted === true){
                await User.updateOne({phone:phone},{$set:{"deleted":false}});
            }

            if(rec && rec.verified === true){
                let token = jwt.sign({'phone': phone}, access_key, { expiresIn: '20d' });
                res.send({code:200, message : "Authenicated" , data :{verified:true , token : token}})
            }else if(rec && rec.verified === false){
                let token = jwt.sign({'phone': phone}, access_key, { expiresIn: '20d' });
                res.send({code:200, message : "Verified and Authenicated" , data :{verified:true , token : token}})
            }else if(!rec){
                const user = new User({
                    phone:phone,
                    verified:true,
                    getUpdates:"sms"
                });
                await user.save();
                let token = jwt.sign({'phone': phone}, access_key, { expiresIn: '20d' });
                res.send({code:200, message : "Verified and Created" , data :{verified:true , token : token}})
            }
        }else{
            res.send({code:400, message : "Incorrect otp" , data :{verified:false}})
        }
    }catch(err){
        res.send({code:400, message : err , data :{verified:false}})
    }
})


router.post("/updateProfile", authToken , async(req,res)=>{
    try{
        let name = req.body.name;
        let getUpdates = req.body.getUpdates;
        await User.updateOne({phone:req.user.phone} , {$set:{name:name,getUpdates:getUpdates}});
        let rec =await User.findOne({phone:req.user.phone})
        console.log(rec)
        res.send({code:200, message : "Updated" , data :{name:rec.name, getUpdates : rec.getUpdates}})
    }catch(e){
        res.send({code:400, message : err , data :{Updated:false}})
    }
})


router.post("/deleteAccount", authToken , async(req,res) => {
    try{
        let otp = req.body.otp;
        let phone = req.user.phone;
        let hash = req.body.hash;
        let verified = verifyOTP(phone,hash,otp);
        console.log(verified)
        if(verified){
            await User.updateOne({phone:req.user.phone} , {$set:{deleted:true}});
            res.send({code:200, message : "Deleted" , data :{Deleted:true}})
        }else{
            res.send({code:400, message : "Incorrect otp" , data :{Deleted:false}})
        }
    }catch(e){
        res.send({code:400, message : err , data :{Deleted : false}})
    }
})

module.exports = router;