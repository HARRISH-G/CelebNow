var express = require('express');
const mongoose = require("mongoose");
var app = express();


mongoose.set('strictQuery', false);

const mongoDB = "mongodb+srv://harrish:9791296877@cluster0.twim6bd.mongodb.net/test?retryWrites=true&w=majority"

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);


app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(3000,() => {
   var host = server.address().address
   var port = server.address().port
    mongoose.connect(mongoDB).then(console.log("connected"));
   console.log("Example app listening at http://%s:%s", host, port)
})

