const express = require('express')
const router = express.Router()
const linkr = require('../db/model/linkModel')

router.post('/add',(req,res)=>{
    const {link,src,imgsrc,content} = req.body
    linkr.create({link,src,imgsrc,content},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
    
})
router.get('/find',(req,res)=>{
    linkr.find({},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/delete',(req,res)=>{
    const {id} = req.query
    linkr.deleteOne({_id:id},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
module.exports = router