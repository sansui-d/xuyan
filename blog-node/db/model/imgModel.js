const mongoose = require('mongoose')
const imgSchema = new mongoose.Schema({
    name : {type:String,require:true},//
    url : {type:String,require:true},//
    type : {type:String}
})

var img = mongoose.model('img',imgSchema);

module.exports = img