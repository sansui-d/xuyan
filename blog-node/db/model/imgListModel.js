const mongoose = require('mongoose')
const t = require('../../utils/setTime')
const imgListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: String, default: t.time() },
})

var imgList = mongoose.model('imgList', imgListSchema);

module.exports = imgList