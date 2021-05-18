const express = require('express')
const router = express.Router()
const classify = require('../db/model/classifyModel')

router.post('/add',(req,res)=>{
    const {classifyName} = req.body
    classify.create({classifyName},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
router.get('/find',(req,res)=>{
    classify.find({},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.post('/upd',(req,res)=>{
    const {id,classifyName} = req.body
    classify.findOneAndUpdate({_id:id},{classifyName:classifyName},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
router.get('/delete',(req,res)=>{
    const {id} = req.query
    classify.deleteOne({_id:id},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
module.exports = router