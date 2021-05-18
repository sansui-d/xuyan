const express = require('express')
const router = express.Router()
const login = require('../db/model/loginModel')
var vertoken=require('../token/token')

router.post('/find', function (req, res) {
    const {user,pass} = req.body
    login.find({user,pass},function(err,data){
        if(err){
            res.send(err)
        }else{
            if(data.length===0){
                res.send({status:200,message:'用户不存在'})
            }else if(user===data[0].user&& pass!==data[0].pass){
                return res.json({
                    result:0,
                    status:200,
                    message:"密码错误"
                })
            }else if(user!==data[0].user && pass===data[0].pass){
                return res.json({
                    result:0,
                    status:200,
                    message:'账户名有误'
                })
            }else{
                vertoken.setToken(pass,data[0]._id).then(token=>{
                        return  res.json({
                             code: 200,
                             message: '登录成功',
                             token:token
                              //前端获取token后存储在localStroage中,
                             //**调用接口时 设置axios(ajax)请求头Authorization的格式为`Bearer ` +token
                         })
                     })
            }
            
        }
    })
});
module.exports = router