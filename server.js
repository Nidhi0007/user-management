const express =require( "express");
const dotenv =require( "dotenv");
const route = require("./routes/index");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
;

// *Useful for getting environment vairables
dotenv.config()
const port = process.env.PORT;
const url = process.env.URL;
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/", route);


// mongodb connection
mongoose.connect(url).then(()=>{
    console.log("connected");
});


app.listen(port, function () {
    console.log('App listening on port 8000!');
  });