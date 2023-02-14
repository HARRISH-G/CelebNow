const mongoose = require("mongoose");


// Define a schema
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
  name: String,
  phone: { type:String , unique: true },
  password:String,
  username:{ type:String , unique: true },
  bio : String,
  profileImg :String,
  tags:[String],
  monetization:{
    type : Boolean,
    default: true
  },
  services:{
    dm : {
        paid : {
            type : Boolean,
            default: false
          },
        value : {
            type:Number,
            default:0
        },
        monetization:{
            type : Boolean,
            default: true
          },
    },
    recordedVideo: {
        paid : {
            type : Boolean,
            default: false
          },
        value : {
            type:Number,
            default:0
        },
        monetization:{
            type : Boolean,
            default: true
          },
    },
  },
  creditBalance : {
    type:Number,
    default:0
    },
  getUpdates :{type:String ,  enum: ["sms","whatsapp","both"] } ,
  deleted : { type: Boolean , default : false},
  created: { type: Date, default: Date.now() },
  __v:0

});

const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;