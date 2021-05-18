const express = require('express')
const router = express.Router()
const imgList = require('../db/model/imgListModel')
const img = require('../db/model/imgModel')

router.post('/add',(req,res)=>{
    const {name} = req.body
    imgList.create({name},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
    
})
router.get('/find',(req,res)=>{
    imgList.find({},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/findPhotoList',(req,res)=>{
    let page = req.query.page||1
    let pageSize = 9
    let type
    imgList.find({},function(err,data){
        if(err){
            res.send(err)
        }else{
            if(req.query.type){
                type = req.query.type
            }else{
                type = data[0].name
            }
            img.find({ type:type}).limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
        .then((imgList) => {
            img.find({type}).countDocuments({type}).then((count) => {
                res.send({ data, count, imgList})
            })
        }).catch((err) => {
            res.send(err)
        })
        }
    })
})
router.get('/delete',(req,res)=>{
    const {name} = req.query
    imgList.deleteOne({name:name},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
module.exports = router