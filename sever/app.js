var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors")

var checkToken = require("../middleware/checkToken")
var users = require("./routes/user")
var boards = require("./routes/board")
var containers = require("./routes/container")
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
app.use(checkToken)

app.use("/users", users)
app.use("/boards", boards)
app.use("/containers", containers)
app.listen(8080, () => {
  console.log("trello server start!!!!")
})