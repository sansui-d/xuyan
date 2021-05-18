import main from "../pages/user/main"
import about from "../pages/user/about"
import classify from "../pages/user/classify"
import classifyList from "../pages/user/classifyList"
import file from "../pages/user/file"
import link from "../pages/user/link"
import login from "../pages/user/login"
import tag from "../pages/user/tag"
import photoList from "../pages/user/photoList"
import tagList from "../pages/user/tagList"
import article from "../pages/user/article"
import home from "../pages/admin/home"
import articleList from "../pages/admin/article/ArticleList"
import articleAdd from "../pages/admin/article/ArticleAdd"
import articleUpt from "../pages/admin/article/ArticleUpt"
import adminClassify from "../pages/admin/classify/AdminClassify"
import adminLink from "../pages/admin/link/AdminLink"
import message from "../pages/admin/message/message"
import personal from "../pages/admin/personal/personal"
import staging from "../pages/admin/staging/staging"
import adminTag from "../pages/admin/tag/AdminTag"
import user from "../pages/admin/user/user"
import photo from "../pages/admin/photo/photo"
import err from "../pages/admin/404/404"
import img from "../pages/admin/photo/img"
import imgList from "../pages/admin/photo/imgList"

const routersUser = [
    { path: '/', component: main, exact: true, },
    { path: '/about', component: about, exact: true, },
    { path: '/classify', component: classify, exact: true, },
    { path: '/classify/:classifyName', component: classifyList, exact: true, },
    { path: '/file', component: file, exact: true, },
    { path: '/link', component: link, exact: true, },
    { path: '/tag/:tagName', component: tagList, exact: true, },
    { path: '/tag', component: tag, exact: true, },
    { path: '/article/:art', component: article,exact: true, },
    { path: '/photoList', component: photoList, },
    { path: '/login', component: login, },
]
const routersAdmin = [
    {
        path: '/admin', component: home, children: [
            { path: '/admin/articleList', component: articleList },
            { path: '/admin/articleAdd', component: articleAdd },
            { path: '/admin/articleUpt', component: articleUpt },
            { path: '/admin/classify', component: adminClassify },
            { path: '/admin/link', component: adminLink },
            { path: '/admin/message', component: message },
            { path: '/admin/personal', component: personal },
            { path: '/admin/staging', component: staging },
            { path: '/admin/tag', component: adminTag },
            { path: '/admin/user', component: user },
            { path: '/admin/photo', component: photo },
            { path: '/admin/img', component: img },
            { path: '/admin/imgList', component: imgList },
            { path: '/admin/err', component: err },
        ]
    },
]
export { routersUser, routersAdmin }