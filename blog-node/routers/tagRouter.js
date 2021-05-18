const express = require('express')
const router = express.Router()
const tag = require('../db/model/tagModel')

router.post('/add',(req,res)=>{
    const {tagName} = req.body
    tag.create({tagName},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
router.get('/find',(req,res)=>{
    tag.find({},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.post('/upd',(req,res)=>{
    const {id,tagName} = req.body
    tag.findOneAndUpdate({_id:id},{tagName:tagName},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
router.get('/delete',(req,res)=>{
    const {id} = req.query
    tag.deleteOne({_id:id},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
module.exports = router