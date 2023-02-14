const crypto       = require("crypto");
const key          = "verysecretkey"; // Key for cryptograpy. Keep it secret





module.exports.createNewOTP= (phone)=>{
    // Generate a 6 digit numeric OTP
    function generateotp() {
        var digits = '1234567890';
        var otp = ''
        for (i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }


    const otp      = generateotp();
    const ttl      = 5 * 60 * 1000; //5 Minutes in miliseconds
    const expires  = Date.now() + ttl; //timestamp to 5 minutes in the future
    const data     = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
    const hash     = crypto.createHmac("sha256",key).update(data).digest("hex"); // creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
    // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
    //sms(phone,`Your OTP is ${otp}. it will expire in 5 minutes`);
    console.log(typeof otp)
    return {fullHash, otp};
}

module.exports.verifyOTP = (phone,hash,otp)=>{
    // Seperate Hash value and expires from the hash returned from the user
    let [hashValue,expires] = hash.split(".");
    // Check if expiry time has passed
    let now = Date.now();
    if(now>parseInt(expires)) return false;
    // Calculate new hash with the same key and the same algorithm
    let data  = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
    // Match the hashes
    if(newCalculatedHash === hashValue){
        return true;
    } 
    return false;
}