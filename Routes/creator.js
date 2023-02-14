const express = require("express");

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const router = express.Router();
const {createNewOTP,verifyOTP} = require("../Methods/otpGenerator");
const {sms} = require("../Methods/sms")
const Creator = require("../Models/creator");


const { authToken } = require("../Middleware/creatortoken")

const access_key = "Harrish";

router.post("/sendOtp",async(req, res)=> {
    try{
        let phone = req.body.phone;
        console.log(phone)
        let {fullHash, otp} = createNewOTP(phone)
        console.log(otp ,fullHash)
        let rec = await sms(phone , `Your OTP is ${otp}. it will expire in 5 minutes` );
        console.log("res",rec)
        if(rec === "true"){
            return res.send({code:200, message : "otp sent" , data :{hash:fullHash}})
        }else{
            return res.send({code:400, message : "otp not sent" , data :{}})
        }
    }catch(err){
        return res.send({code:400, message : err , data :{}})
    }
})


router.post("/register",async(req, res)=> {
    try{
        let otp = req.body.otp;
        let phone = req.body.phone;
        let hash = req.body.hash;
        let name = req.body.name;
        let password = req.body.password;
        let hashedPass = await bcrypt.hash(password, 10);
        let username = req.body.username;
        let verified = verifyOTP(phone,hash,otp);
        console.log(verified)
        if(verified){
            let rec = await Creator.findOne({phone : phone})
            if(!rec){
                const creator = new Creator({
                    name : name,
                    password : hashedPass,
                    username : username,
                    phone:phone,
                    verified:true,
                    getUpdates:"both"
                });
                await creator.save();
                let token = jwt.sign({'phone': phone , "username" : username}, access_key, { expiresIn: '10d' });
                return res.send({code:200, message : "Verified and Created" , data :{verified:true ,Registered : true, token : token}})
            }
        }else{
            return res.send({code:400, message : "Incorrect otp" , data :{Registered:false,Verified:false}})
        }
    }catch(err){
        return res.send({code:400, message : err , data :{Registered:false,Verified:false}})
    }
})



router.post("/loginByOtp" ,async (req,res)=>{
    try{
        let otp = req.body.otp;
        let phone = req.body.phone;
        let hash = req.body.hash;
        let verified = verifyOTP(phone,hash,otp);
        console.log(verified)
        if(verified){
            let rec = await Creator.findOne({phone : phone})
            if(rec.deleted === true){
                await Creator.updateOne({phone:phone},{$set:{"deleted":false}});
            }

            if(rec && rec.verified === true){
                let token = jwt.sign({'phone': phone , "username" : username}, access_key, { expiresIn: '10d' });
                return res.send({code:200, message : "Authenicated" , data :{verified:true , token : token}})
            }else if(rec && rec.verified === false){
                let token = jwt.sign({'phone': phone , "username" : username}, access_key, { expiresIn: '10d' });
                return res.send({code:200, message : "Verified and Authenicated" , data :{verified:true , token : token}})
            }
        }else{
            return res.send({code:400, message : "Incorrect otp" , data :{verified:false}})
        }
    }catch(err){
        return res.send({code:400, message : err , data :{verified:false}})
    }
})


router.post("/login", async(req,res) =>{
    try{
        let username = req.body.username
        let password = req.body.password;
        let rec = await Creator.findOne({username:username})
        if(rec){
            if(await bcrypt.compare(password, rec.password)){
                let token = jwt.sign({'phone': phone , "username" : username}, access_key, { expiresIn: '10d' });
                return res.send({code:200, message : "Authenicated" , data :{Authenicated:true , token : token}})
            }else{
                return res.send({code:400, message : "wrong password" , data :{}})
            }
        }else{
            return res.send({code:400, message : "no user found" , data :{}})
        }
    }catch(err){
        return res.send({code:400, message : err , data :{}})
    }
})

router.post("/updateProfile", authToken , async(req,res)=>{
    try{
        let name = req.body.name;
        let getUpdates = req.body.getUpdates;
        await Creator.updateOne({phone:req.user.phone} , {$set:{name:name,getUpdates:getUpdates}});
        let rec =await Creator.findOne({phone:req.user.phone})
        console.log(rec)
        return res.send({code:200, message : "Updated" , data :{name:rec.name, getUpdates : rec.getUpdates}})
    }catch(e){
        return res.send({code:400, message : err , data :{Updated:false}})
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
            await Creator.updateOne({phone:req.user.phone} , {$set:{deleted:true}});
            return res.send({code:200, message : "Deleted" , data :{Deleted:true}})
        }else{
            return res.send({code:400, message : "Incorrect otp" , data :{Deleted:false}})
        }
    }catch(e){
        return res.send({code:400, message : err , data :{Deleted : false}})
    }
})

module.exports = router;