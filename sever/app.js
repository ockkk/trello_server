var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors")

var users = require("./routes/user")

const app = express();
const models = require("../models/index");

models.sequelize.sync().then( () => {
  console.log("DB connect success!!😃");
}).catch(err => {
  console.log("Db connect fail!!😡");
  console.log(err);
}) 

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use("/users", users)
app.listen(8080, () => {
  console.log("trello server start!!!!")
})