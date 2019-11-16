var express = require("express");
var router = express.Router();
var users = require("../../models").users
var boards = require("../../models").boards
var containers = require("../../models").containers
var cards = require("../../models").cards

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  await containers
    .findAll({
      include:[{
        model: cards,
        attributes: ["cd_key", "cd_name"],
      }],
      where: {b_key: req.params.id}
    })
    .then(val => res.json(val))
})

router.post("/", async (req,res) => {
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
    .then(val => res.json({
      b_key:val.dataValues.b_key,
      success: true,
      message: 'board가 생성되었습니다.📄',
    }))
    .catch((err) => {
      res.send(400).json({
        success: false,
        message: '잘못된 요청입니다.😡'
      })
    })
})

router.delete("/:id", async (req, res) =>{
  let boardExist = await boards.findOne({
    where:{
      b_key: req.params.id
    }
  })

  if(req.token && boardExist){
    boards
      .destroy({
        where:{
          b_key: req.params.id
        }
      })
      .then(() => {
        res.json({
          success: true,
          message: 'board가 삭제 되었습니다.🗑'
        })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: '잘못된 요청입니다.😡'
        })
      })
  }
  res.send(400).json({
    success: false,
    message: '잘못된 요청입니다.😡'
  })
})

router.put("/:id", async (req,res) => {
  console.log(req.body, req.params)
  let boardExist = await boards.findOne({
    where:{
      b_key: req.params.id
    }
  })

  if(req.token && boardExist){
    await boards.update({
      b_name: req.body.b_name
    },
    {
      where : {
        b_key: req.params.id
      }
    })
    .then(() => {
      res.json({
        success: true,
        message: 'board가 수정 되었습니다.📑'
      })
    })
  }
  res.send(400).json({
    success: false,
    message: '잘못된 요청입니다.😡'
  })
})
module.exports = router