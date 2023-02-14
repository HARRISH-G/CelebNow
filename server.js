var express = require('express');
const mongoose = require("mongoose");
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser');

const user = require("./Routes/user")


// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// To parse json data
app.use(bodyParser.json());


mongoose.set('strictQuery', false);

const mongoDB = "mongodb+srv://harrish:9791296877@cluster0.twim6bd.mongodb.net/test?retryWrites=true&w=majority"

app.use(express.json());
app.use(cors());


app.get('/', function (req, res) {
   res.send('Hello World');
})

app.use("/users",user)

var server = app.listen(3000,() => {
   var host = server.address().address
   var port = server.address().port
    mongoose.connect(mongoDB).then(console.log("connected"));
   console.log("Example app listening at http://%s:%s", host, port)
})

