var express = require("express");
var router = express.Router();
var containers = require("../../models").containers
var cards = require("../../models").cards

router.get("/", async (req, res) => {
  await containers
    .findAll()
    .then(result => res.json(result))
})

router.get("/:id", async (req, res) => {
  await containers
    .findAll({
      include:[{
        model: cards,
        attributes: ["cd_key", "cd_name"]
      }],
      where: {ct_key: req.params.id}
    })
    .then(result => res.json(result))
    .catch(err => res.send(err))
})

router.post("/:id", async (req,res) => {
  if(req.token){
    await containers
      .create({
        ct_name: req.body.ct_name,
        b_key: req.params.id
      })
      .then(val =>
        res.json({
        ct_key: val.dataValues.ct_key,
        success: true,  
        message: 'contaner가 생성되었습니다.📦',
      }))
      .catch((err) => { 
        res.send(400).json({
          success: false,
          message: '잘못된 요청입니다.😡'
        })
      })
  }
})

router.delete("/:id", async (req, res) =>{
  let ctExist = await containers.findOne({
    where:{
      ct_key: req.params.id
    }
  })

  if(req.token && ctExist){
   await containers
      .destroy({
        where:{
          ct_key: req.params.id
        }
      })
      .then(() => {
        res.json({
          success: true,
          message: 'contaner가 삭제 되었습니다.🗑'
        })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: '잘못된 요청입니다.😡'
        })
      })
  }
})

router.put("/:id", async (req,res) => {
  let boardExist = await containers.findOne({
    where:{
      ct_key: req.params.id
    }
  })

  if(req.token && boardExist){
    await containers.update({
      ct_name: req.body.ct_name
    },
    {
      where : {
        ct_key: req.params.id
      }
    })
    .then(() => {
      res.json({
        success: true,
        message: 'contaner가 수정 되었습니다.📦'
      })
    })
  }
})

module.exports = router