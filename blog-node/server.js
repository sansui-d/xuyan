const express = require('express')
const db = require('./db/connect')
const app = express()
const path = require('path')
const userRouter = require('./routers/userRouter')
const articleRouter = require('./routers/articleRouter')
const tagRouter = require('./routers/tagRouter')
const classifyRouter = require('./routers/classifyRouter')
const imgRouter = require('./routers/imgRouter')
const commentRouter = require('./routers/commentRouter')
const recommentRouter = require('./routers/recommentRouter')
const linkRouter = require('./routers/linkRouter')
const imgListRouter = require('./routers/imgListRouter')
const loginRouter = require('./routers/loginRouter')
const bodyParser = require('body-parser')
var vertoken = require('./token/token')
var expressJwt = require('express-jwt')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json({ limit: '20mb' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//token
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (token == undefined) {
        return next();
    } else {
        vertoken.getToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch((error) => {
            return next();
        })
    }
});
app.use(expressJwt({
    secret: 'aimer',
    algorithms: ['HS256']
}).unless({
    //不需要验证的接口名称
    path: [
        { url: '/login/find', methods: ['POST'] },
        { url: '/article/findId', methods: ['GET'] },
        { url: '/article/findPage', methods: ['POST'] },
        { url: '/comment/find', methods: ['POST'] },
        { url: '/comment/add', methods: ['POST'] },
        { url: '/link/find', methods: ['GET'] },
        { url: '/imgList/findPhotoList', methods: ['GET'] },
        { url: '/recomment/add', methods: ['POST'] },
        { url: '/tag/find', methods: ['GET'] },
        { url: '/classify/find', methods: ['GET'] },
        { url: '/article/find', methods: ['GET'] },
        { url: '/article/findTag', methods: ['POST'] },
        { url: '/article/findClassify', methods: ['POST'] },
    ]
}))

app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/article', articleRouter)
app.use('/tag', tagRouter)
app.use('/classify', classifyRouter)
app.use('/comment', commentRouter)
app.use('/recomment', recommentRouter)
app.use('/link', linkRouter)
app.use('/img', imgRouter)
app.use('/imgList', imgListRouter)

app.use(function (err, req, res, next) {
    if (err.status == 401) {
        return res.status(401).send('token失效')
        //可以设置返回json 形式  res.json({message:'token失效'})
    }
})

app.listen(4000, () => {
    console.log('server ok')
})