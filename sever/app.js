var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors")


const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(8080, () => {
  console.log("trello server start!!!!")
})