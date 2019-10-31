var express = require("express");
var router = express.Router();
var users = require("../../models").users
var boards = require("../../models").boards

router.get("/list", async (req, res) => {
  const userKey = await users
    .findOne({ 
      attributes: ["u_key"],
      where: {u_email: req.token.email}})
    .then(result => result.dataValues.u_key)
  
  boards
    .findAll({
      where: {u_key : userKey}
    })
    .then(result => res.json(result))
    .catch(err => res.send(err))
})

router.post("/add", async (req,res) => {
  const userKey = await users
  .findOne({ 
    attributes: ["u_key"],
    where: {u_email: req.token.email}})
  .then(result => result.dataValues.u_key)

  boards
    .create({
      b_name : req.body.b_name,
      u_key : userKey
    })
    .then(() => res.json({
      success: true,
      message: 'board가 생성되었습니다.📄',
    }))
})

module.exports = router