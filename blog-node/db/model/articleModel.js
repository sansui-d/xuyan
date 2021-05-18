const mongoose = require('mongoose')
const t = require('../../utils/setTime') 
const articleSchema = new mongoose.Schema({
    title : {type:String,required:true},//标题
    author : {type:String,require:true},//作者
    keyword : {type:String,require:true},//关键字
    titleImg: {type:String,require:true},//封面
    content:{type:String,require:true},//内容
    desc:{type:String,require:true},//描述
    contentJson:{type:Object,require:true},//内容json
    tagName: {type:Array,require:true},//标签
    classifyName: {type:String,require:true},//分类
    condition: {type:String,default:'草稿'},//状态
    watch: {type:Array,default:[0,0]},//观看
    original : {type:String,default:'原创'},//原创状态
    link : {type:String},//转载地址
    time: {type:String,default:t.time()},//创建时间
})

var article = mongoose.model('article',articleSchema);

module.exports = article