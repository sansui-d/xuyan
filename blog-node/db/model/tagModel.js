const mongoose = require('mongoose')
const t = require('../../utils/setTime') 
const tagSchema = new mongoose.Schema({
    tagName : {type:String,required:true},
    time:{type:String,default:t.time()},
    num:{type:Number,default:0}
})

var Tag = mongoose.model('tags',tagSchema);

module.exports = Tag