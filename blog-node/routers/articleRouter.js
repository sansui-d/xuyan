const express = require('express')
const router = express.Router()
const article = require('../db/model/articleModel')
const classify = require('../db/model/classifyModel')
const tag = require('../db/model/tagModel')

router.post('/add', (req, res) => {
    const data = req.body
    const { classifyName, tagName } = req.body
    article.insertMany(data, function (err) { if (err) { res.send(err) } })
    classify.findOneAndUpdate({ classifyName: classifyName }, { "$inc": { "num": 1 } }, function (err) { if (err) { res.send(err) } })
    for (let item of tagName) {
        tag.findOneAndUpdate({ tagName: item }, { "$inc": { "num": 1 } }, function (err) { if (err) { res.send(err) } })
    }
    res.send({ ok: 1 })
})
router.get('/find', (req, res) => {
    let data = req.query
    const condition = '发布'
    article.find({}, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
router.get('/findId', (req, res) => {
    let {_id} = req.query
    article.findOne({ _id: _id }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            if(data){
            let wat = data.watch
            wat[0] = wat[0] + 1
            article.findOneAndUpdate({_id:_id},{watch:wat},function(err,a){
                if(err){
                    res.send(err)
                }else{
                    res.send(data)
                }
            })
        }
        }
    })
})
router.post('/findTag', (req, res) => {
    let {tagName} = req.body
    article.find({ tagName: tagName }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
router.post('/findClassify', (req, res) => {
    let {classifyName} = req.body
    article.find({ classifyName: classifyName }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/findPage', (req, res) => {
    let pageSize = req.body.pageSize || 10
    let page = req.body.page || 1
    let condition = '发布'
    article.find({condition:condition}).limit(Number(pageSize)).skip(Number((page-1)*pageSize))
    .then((data)=>{
        article.find({condition:condition}).estimatedDocumentCount().then((count)=>{
            res.send({data,count})
        })
    }).catch((err)=>{
        res.send(err)
    })
})
router.post('/updcon',(req,res) =>{
    const {_id,condition} = req.body
    article.findOneAndUpdate({ _id: _id }, {condition:condition}, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send({ ok: 1 ,data})
        }
    })
})


router.post('/upd', (req, res) => {
    const { link,id, title, author, keyword, desc, titleImg, condition, original, tagName, classifyName, editorState } = req.body
    article.findOne({ _id: id }, function (err, data) {
        if (data.classifyName !== classifyName) {
            classify.findOneAndUpdate({ classifyName: classifyName }, { "$inc": { "num": 1 } }, function (err) { if (err) { res.send(err) } })
            classify.findOneAndUpdate({ classifyName: data.classifyName }, { "$inc": { "num": -1 } }, function (err) { if (err) { res.send(err) } })
        }
        if (data.tagName !== tagName) {
            let arr1 = tagName.filter(item => data.tagName.indexOf(item) == -1)
            let arr2 = data.tagName.filter(item => tagName.indexOf(item) == -1)
            for (let item of arr1) {
                tag.findOneAndUpdate({ tagName: item }, { "$inc": { "num": 1 } }, function (err) { if (err) { res.send(err) } })
            }
            for (let item of arr2) {
                tag.findOneAndUpdate({ tagName: item }, { "$inc": { "num": -1 } }, function (err) { if (err) { res.send(err) } })
            }
        }
        if (err) { res.send(err) }
        

    })
    article.findOneAndUpdate({ _id: id }, {
        title: title, author: author,link:link,
        keyword: keyword, desc: desc, titleImg: titleImg, condition: condition,
        original: original, tagName: tagName, classifyName: classifyName, editorState: editorState
    }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send({ ok: 1 })
        }
    })
})
router.post('/delete',(req,res)=>{
    const {_id,tagName,classifyName} =req.body
    article.deleteOne({_id:_id}, function (err) { if (err) { res.send(err) } })
    classify.findOneAndUpdate({ classifyName: classifyName }, { "$inc": { "num": -1 } }, function (err) { if (err) { res.send(err) } })
    for (let item of tagName) {
        tag.findOneAndUpdate({ tagName: item }, { "$inc": { "num": -1 } }, function (err) { if (err) { res.send(err) } })
    }
    res.send({ ok: 1 })
})

module.exports = router