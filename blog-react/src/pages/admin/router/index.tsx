import { Route, Switch } from 'react-router-dom';
import ArticleAdd from '../article/ArticleAdd';
import ArticleList from '../article/ArticleList';
import ArticleUpt from '../article/ArticleUpt';
import adminClassify from "../classify/AdminClassify"
import adminLink from "../link/AdminLink"
import message from "../message/message"
import personal from "../personal/personal"
import staging from "../staging/staging"
import adminTag from "../tag/AdminTag"
import user from "../user/user"
import photo from "../photo/photo"
import img from "../photo/img"
import imgList from "../photo/imgList"
import err from "../404/404"

function Routers() {
    return (
        <Switch>
            <Route path="/admin/articleAdd" component={ArticleAdd}></Route>
            <Route path="/admin/articleList" component={ArticleList}></Route>
            <Route path="/admin/ArticleUpt" component={ArticleUpt}></Route>
            <Route path="/admin/classify" component={adminClassify}></Route>
            <Route path="/admin/link" component={adminLink}></Route>
            <Route path="/admin/message" component={message}></Route>
            <Route path="/admin/personal" component={personal}></Route>
            <Route path="/admin/staging" component={staging}></Route>
            <Route path="/admin/tag" component={adminTag}></Route>
            <Route path="/admin/user" component={user}></Route>
            <Route path="/admin/err" component={err}></Route>
            <Route path="/admin/photo" component={photo}></Route>
            <Route path="/admin/img" component={img}></Route>
            <Route path="/admin/imgList" component={imgList}></Route>
        </Switch>
    )
}

export default Routers