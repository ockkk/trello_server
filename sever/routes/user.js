var express = require("express");
var crpyto = require("crypto");
var router = express.Router();
var jwt = require("jsonwebtoken");
var jwtKey = require("../config/jwt.js");

var users = require("../../models").users


router.post("/", async (req, res) => {
  const userExist = await users
    .findOne({ where: {u_email: req.body.email}})
    .then(result => result)
  
  if(!userExist){
    crpyto.randomBytes(64, (err, buf) => {
      crpyto.pbkdf2(req.body.password, buf.toString('base64'), 10000, 64, 'sha512', (err,key)=>{
        users.create({
          u_name: req.body.name,
          u_email: req.body.email,
          u_password: key.toString("base64"),
          salt: buf.toString("base64")
        }).then(()=>{
          res.json({
            success: true,
            message: "회원가입이 되었습니다👌" 
          })
        }).catch(function(err){
          res.send(err);
        })
      })
    })
  } else {
    res.json({
      success: false,
      message: "이미 존재하는 사용자 입니다.🙅🏻‍♂️" 
    })
  }
})

router.post("/signin", async (req, res) => {
  users
    .findOne({ where : {u_email: req.body.email}})
    .then(user => {
      let token = jwt.sign(
        {email: user.dataValues.u_email},
        jwtKey.secret,
        {expiresIn: '24h'})

      crpyto.pbkdf2(
        req.body.password, user.dataValues.salt, 10000, 64, 'sha512', (err, key) => {
          if(key.toString('base64') === user.dataValues.u_password){
            res.cookie("user", token)
            res.json({
              success: true,
              message: '로그인 되었습니다.😋',
              token: token
            })
          } else {
            res.send(403).json({
              u_name: user.dataValues.u_name,
              success: false,
              message: '회원정보가 일치 하지 않습니다.😰'
            });
          }
        })
    })
    .catch((err) => {
      res.send(400).json({
        success: false,
        message: '잘못된 요청입니다.😡'
      });
    })
})

router.post("/signout", (req, res) => {

})

router.put("/:id", (req, res) => {
  if(req.token){
    crpyto.randomBytes(64, (err, buf) => {
      crpyto.pbkdf2(req.body.password, buf.toString('base64'), 10000, 64, 'sha512', (err,key)=>{
        users.update({
          u_name: req.body.name,
          u_email: req.body.email,
          u_password: key.toString("base64"),
          salt: buf.toString("base64")
        },
        {
          where: {
            id: req.token.email
          }
        }
        ).catch((err) => res.send(err))
      })
    })
  }
})

router.delete('/:id', (req, res) => {
  if(req.token){
    users.destroy({
      where:{
        u_email: req.token.email
      }
    })
    .then(()=>{
      res.json({
        message: "탈퇴가 완료 되었습니다.",
        success: true
      })
    })
  } else {
    res.send(404).json({
      message: "잘못된 요청입니다.",
      success: false
    })
  }
})
module.exports = router;