const express = require('express')
const router = express.Router()
const img = require('../db/model/imgModel')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const upload = multer({
    dest: './static/upload',
})

router.post('/add', (req, res) => {
    // img.insertMany(req.body)
    const type = '首页'
    let data = req.body.fileList[0].base
    let name = req.body.fileList[0].name
    let mo = name.substring(name.indexOf('.'),name.length)
    let pathurl = 'static/upload/' + Date.now() + mo
    let pathurl2 = pathurl.substring(7)
    let base = data.replace(/^data:image\/\w+;base64,/, "")
    let buffer = Buffer.from(base, 'base64')
    fs.writeFile(pathurl, buffer, function (err) {
        if (err) {
            res.send(err)
        } else {
            img.create({ name: name, url: pathurl2,type:type }, function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ ok: 1 })
                }
            })
        }
    })
})
router.get('/find', (req, res) => {
    let data = req.query
    img.find({type:'首页'}, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
router.get('/delete', (req, res) => {
    let { url } = req.query
    let url2 = 'static/' + url
    fs.unlink(url2, function (err) {
        if (err) {
            res.send(err)
        } else {
            img.deleteOne({ url: url }, function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ ok: 1 })
                }
            })
        }
    })

})
//link
router.post('/addLink', (req, res) => {
    // img.insertMany(req.body)
    const type = "链接"
    let data = req.body.fileList[0].base
    let name = req.body.fileList[0].name
    let mo = name.substring(name.indexOf('.'),name.length)
    let pathurl = 'static/link/' + Date.now() + mo
    let pathurl2 = pathurl.substring(7)
    let base = data.replace(/^data:image\/\w+;base64,/, "")
    let buffer = Buffer.from(base, 'base64')
    fs.writeFile(pathurl, buffer, function (err) {
        if (err) {
            res.send(err)
        } else {
            img.create({ name: name, url: pathurl2,type:type }, function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ ok: 1 })
                }
            })
        }
    })
})
router.get('/findLink', (req, res) => {
    let data = req.query
    img.find({type:'链接'}, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
router.get('/deleteLink', (req, res) => {
    let { url } = req.query
    let url2 = 'static/' + url
    fs.unlink(url2, function (err) {
        if (err) {
            res.send(err)
        } else {
            img.deleteOne({ url: url }, function (err, data) {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ ok: 1 })
                }
            })
        }
    })

})
//imglist
router.post('/addImgList', (req, res) => {
    // img.insertMany(req.body)
    const {type} = req.body
    let data = req.body.fileList[0].base
    let name = req.body.fileList[0].name
    let mo = name.substring(name.indexOf('.'),name.length)
    let pathurl = 'static/imgList/' + Date.now() + mo
    let pathurl2 = pathurl.substring(7)
    let base = data.replace(/^data:image\/\w+;base64,/, "")
    let buffer = Buffer.from(base, 'base64')
    fs.writeFile(pathurl, buffer, function (err) {
        if (err) {
            res.send(err)
        } else {
            img.create({ name: name, url: pathurl2,type:type }, function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ ok: 1 })
                }
            })
        }
    })
})
router.get('/findImgList', (req, res) => {
    let {type} = req.query
    img.find({type:type}, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
router.get('/deleteImgList', (req, res) => {
    let { url } = req.query
    let url2 = 'static/' + url
    fs.unlink(url2, function (err) {
        if (err) {
            res.send(err)
        } else {
            img.deleteOne({ url: url }, function (err, data) {
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