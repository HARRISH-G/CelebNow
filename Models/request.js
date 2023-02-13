const mongoose = require("mongoose");


// Define a schema
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  user:String,
  creator:String,
  service:{type:String , enum: ["dm","recordedVideo"]},
  request : {
    occasion:String,
    from: String,
    to:String,
    message:{
        type:String,
        maxlength: 500,
        minlength:1,
    },
    endDate: { type: Date }
  },
  requestStatus:{type:String , enum: ["Pending", "Approved" , "Rejected" , "Completed"]},
  proofOfExistence:String,
  created: { type: Date, default: Date.now() },
  __v:0
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;