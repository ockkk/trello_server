var express = require("express");
var crpyto = require("crypto");
var router = express.Router();
var jwt = require("jsonwebtoken");
var jwtKey = require("../config/jwt.js");

var users = require("../../models").users


router.post("/signup", async (req, res) => {
  const userExist = await users
    .findOne({ where: {u_email: req.body.e_mail}})
    .then(result => result)
  
  if(!userExist){
    crpyto.randomBytes(64, (err, buf) => {
      crpyto.pbkdf2(req.body.password, buf.toString('base64'), 10000, 64, 'sha512', (err,key)=>{
        users.create({
          u_name: req.body.name,
          u_email: req.body.e_mail,
          u_password: key.toString("base64"),
          slat: buf.toString("base64")
        }).then(()=>{
          res.send("가입 성공!")
        }).catch(function(err){
          res.send(err);
        })
      })
    })
  } else {
    res.send("이미 존재하는 사용자입니다!!")
  }
})

router.post("/signin", async (req, res) => {

})

module.exports = router;