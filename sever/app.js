var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors")


const app = express();
const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(8080, () => {
  console.log("trello server start!!!!")
})