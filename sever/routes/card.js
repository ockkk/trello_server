var express = require("express");
var router = express.Router();

var contaners = require("../../models").contaners
var cards = require("../../models").cards

router.get("/", async (req,res) => {
  cards
    .findAll()
    .then(result => res.json(result))
})

router.get("/:id", async (req, res) => {
  cards
    .findAll({
      where: {ct_key: req.params.id}
    })
    .then(result => res.json(result))
    .catch(err => res.send(err))
})

router.post("/:id", async (req,res) => {
  await cards
    .create({
      cd_name: req.body.cd_name,
      ct_key: req.body.ct_key
    })
    .then(val => res.json({
      cd_key: val.dataValues.cd_key,
      success: true,
      message: 'card가 생성되었습니다.🃏',
    }))
    .catch((err) => { 
      res.send(400).json({
        success: false,
        message: '잘못된 요청입니다.😡'
      })
    })
})

router.delete("/:id", async (req, res) =>{
  let cdExits = await contaners.findOne({
    where:{
      cd_key: req.params.id
    }
  })

  if(req.token && cdExits){
    contaners
      .destroy({
        where:{
          cd_key: req.params.id
        }
      })
      .then(() => {
        res.json({
          success: true,
          message: 'card가 삭제 되었습니다.🗑'
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
  let cdExist = await contaners.findOne({
    where:{
      cd_key: req.params.id
    }
  })

  if(req.token && cdExist){
    await contaners.update({
      cd_name: req.body.b_name
    },
    {
      where : {
        cd_key: req.params.id
      }
    })
    .then(() => {
      res.json({
        success: true,
        message: 'card가 수정 되었습니다.🃏'
      })
    })
  }
})

module.exports = router