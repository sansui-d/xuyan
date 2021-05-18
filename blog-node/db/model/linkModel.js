const mongoose = require('mongoose')
const t = require('../../utils/setTime')
const linkSchema = new mongoose.Schema({
    link: { type: String, required: true },
    src: { type: String, required: true },
    time: { type: String, default: t.time() },
    imgsrc: {type: String},
    content:{type: String,default:'什么都没有'}
})

var Link = mongoose.model('link', linkSchema);

module.exports = Link