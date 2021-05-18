const express = require('express')
const router = express.Router()
const recomment = require('../db/model/recommentModel')

router.post('/add',(req,res)=>{
    const {rename,reemail,recontent,commentId,rehead} = req.body
    recomment.create({rename,reemail,recontent,commentId,rehead},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
router.post('/findOne', (req, res) => {
    const {commentId} = req.body
    recomment.find({commentId:commentId}).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})
router.get('/delete',(req,res)=>{
    const {_id} = req.query
    recomment.deleteOne({_id:_id},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({ok:1})
        }
    })
})
module.exports = router