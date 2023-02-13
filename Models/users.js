const mongoose = require("mongoose");


// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  phone: String,
  password:String,
  getUpdates :{type:String ,  enum: ["sms","whatsapp","both"] } ,
  created: { type: Date, default: Date.now() },
  __v:0
});

const User = mongoose.model('User', userSchema);

module.exports = User;