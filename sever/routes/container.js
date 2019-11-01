var express = require("express");
var router = express.Router();
var contaners = require("../../models").containers

router.get("/", async (req, res) => {
  await contaners
    .findAll()
    .then(result => res.json(result))
})

router.get("/:id", async (req, res) => {
  await contaners
    .findAll({
      where: {b_key: req.params.id}
    })
    .then(result => res.json(result))
    .catch(err => res.send(err))
})

router.post("/:id", async (req,res) => {
  if(req.token){
    await contaners
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
  res.send(400).json({
    success: false,
    message: '잘못된 요청입니다.😡'
  })
})

router.delete("/:id", async (req, res) =>{
  let ctExist = await contaners.findOne({
    where:{
      ct_key: req.params.id
    }
  })

  if(req.token && ctExist){
   await contaners
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
  res.send(400).json({
    success: false,
    message: '잘못된 요청입니다.😡'
  })
})

router.put("/:id", async (req,res) => {
  let boardExist = await contaners.findOne({
    where:{
      ct_key: req.params.id
    }
  })

  if(req.token && boardExist){
    await contaners.update({
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
  res.send(400).json({
    success: false,
    message: '잘못된 요청입니다.😡'
  })
})

module.exports = router