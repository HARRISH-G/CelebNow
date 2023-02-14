const mongoose = require("mongoose");


// Define a schema
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  requestId : { type:String , unique: true },
  inputRecieptId : { type:String , unique: true },
  outputRecieptId : { type:String , unique: true },
  service:{type:String , enum: ["dm","recordedVideo"]},
  payInputValue:{type:Number , default:0},
  payOutputValue:{type:Number , default:0},
  paymentInitiation:{type:String , enum: ["Recieved" , "Failed"]},
  paymentStatus:{type:String , enum: ["Paid" ,"Refunded","Due"]},
  proofOfExistence:String,
  created: { type: Date, default: Date.now() },
  __v:0
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;