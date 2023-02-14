const mongoose = require("mongoose");


// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  phone: String,
  password:String,
  verified:{type:Boolean , default : false},
  getUpdates :{type:String ,  enum: ["sms","whatsapp","both"] } ,
  created: { type: Date, default: Date.now() },
  deleted : {type:Boolean , default : false},
  __v:0
});

const User = mongoose.model('User', userSchema);

module.exports = User;