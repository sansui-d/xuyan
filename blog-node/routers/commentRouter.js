const express = require('express')
const router = express.Router()
const comment = require('../db/model/commentModel')
const recomment = require('../db/model/recommentModel')
const article = require('../db/model/articleModel')


router.post('/add', (req, res) => {
    const { name, email, content, artId, head } = req.body
    comment.create({ name, email, content, artId, head }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            article.findOne({ _id: artId }, function (err, data1) {
                if (err) {
                    res.send(err)
                } else {
                    let wat = data1.watch
                    wat[1] = wat[1] + 1
                    article.findOneAndUpdate({_id:artId},{watch:wat},function(err,a){
                        if(err){
                            res.send(err)
                        }else{
                            res.send({ok:1})
                        }
                    })
                }
            })
        }
    })
})
router.post('/find', (req, res) => {
    let pageSize = req.body.pageSize || 3
    let page = req.body.page || 1
    let artId = req.body._id
    let commentdata = []
    comment.find({ artId }).sort({ _id: -1 }).limit(Number(pageSize)).skip(Number((page - 1) * pageSize))
        .then((data) => {
            for (let i of data) {
                recomment.find({ commentId: i._id }, function (err, data) {
                    if (err) {
                        res.send(err)
                    } else {
                        commentdata = commentdata.concat(data)
                    }
                })
            }
            comment.find().countDocuments({ artId }).then((count) => {
                res.send({ data, count, commentdata})
            })
        }).catch((err) => {
            res.send(err)
        })
})
router.post('/findAll', (req, res) => {
    comment.find({}).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/delete', (req, res) => {
    const { _id } = req.query
    comment.deleteOne({ _id: _id }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            recomment.deleteMany({ commentId: _id }, function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ ok: 1 })
                }
            })
        }
    })
})
module.exports = router