import React from 'react';
import './home.css'
import { Pagination, Collapse, Input, Button, Radio, Row, Col, message } from 'antd'
import { ScheduleOutlined, AppstoreOutlined, TagsOutlined, SmileOutlined, IdcardTwoTone } from '@ant-design/icons';
import 'braft-editor/dist/output.css'
import BraftEditor from 'braft-editor'
import { commentAdd, linkFind, commentFind, photolistFind, articleFindPage, articleFindId, recommentAdd } from '../../api/api'
import { Link } from 'react-router-dom'
import Picker from 'emoji-picker-react';
import classify from '../../pages/user/classify';
import { AnyARecord } from 'node:dns';
import tou from './../1.jpeg'
import boy from './../boy.jpeg'
import girl from './../girl.jpeg'
import vx from './../2.png'
import Head from './Head';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'

const { Panel } = Collapse
const { TextArea } = Input

interface IChild {
    title: any,
    article?: any,
    classify?: any,
    art?: any,
    tag?: any,
    tagName?: any,
    classifyName?: any
}

class List extends React.Component<IChild, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            position: 0,
            positionArt: 3,
            current: 1,
            data: [],
            count: null,
            article: {},
            time: [],
            chosenEmoji: {},
            name: '',
            email: '',
            content: '',
            head: 0,
            rename: '',
            reemail: '',
            recontent: '',
            rehead: 0,
            iscomment: false,
            comment: {},
            link: [],
            head1: 0,
            head2: 0,
            page: 2,
            ismore: null,
            imgList: null,
            imgCount: null,
            photo: new Array,
            checked: null,
            imgpage: 1,
        }
        this.change = this.change.bind(this);
        this.change1 = this.change1.bind(this);
        this.addcomment = this.addcomment.bind(this);
        this.addrecomment = this.addrecomment.bind(this);
    }
    componentDidMount() {
        //绑定事件
        if (this.props.title == '首页') {
            articleFindPage({}).then(res => {
                this.setState({ data: res.data })
                this.setState({ count: res.count })
            })
        }
        if (this.props.title == '文章') {
            let a = window.location.pathname
            let name = a.substring(a.lastIndexOf("/") + 1);
            articleFindId({ _id:name }).then((res) => {
                this.setState({ article: res })
            })
            commentFind({ _id:name }).then(res => {
                if (res.data.length == res.count) {
                    this.setState({ ismore: true })
                }
                this.setState({ comment: res })
            })
        }
        if (this.props.title == '友链') {
            linkFind({}).then(res => {
                this.setState({ link: res })
            })
        }
        if (this.props.title == '归档') {
            articleFindPage({}).then(res => {
                let time = new Array
                for (let i of res.data) {
                    if (!time.includes(i.time.substr(0, 4))) {
                        time.push(i.time.substr(0, 4))
                    }
                }
                this.setState({ time: time })
                this.setState({ data: res.data })
                this.setState({ count: res.count })
            })
        }
        if (this.props.title == '相册') {
            photolistFind({}).then(res => {
                this.setState({ checked: res.data[0].name, imgList: res.data, photo: res.imgList, imgCount: res.count })
            })
        }
        window.addEventListener('scroll', this.bindHandleScroll)
    }

    bindHandleScroll = (event: any) => {
        // 滚动的高度
        let scrollB =
            document.documentElement.scrollTop || document.body.scrollTop;
        // 变量 windowHeight 是可视区的高度
        let windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        // 变量 scrollHeight 是滚动条的总高度
        let scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;

        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        if (scrollTop > 0 && scrollTop < 600) {
            this.setState({
                position: scrollTop / 100,
                positionArt: 3 + scrollTop / 300,
            })
        } else if (scrollTop >= 600) {
            this.setState({
                position: 6,
                positionArt: 6,
            })
        } else {
            this.setState({
                position: 0,
                positionArt: 3,
            })
        }

        if (scrollB + windowHeight == scrollHeight && this.props.title == '相册') {
            let { checked, imgpage, photo, imgCount } = this.state
            if (imgCount > photo.length) {
                photolistFind({ page: imgpage + 1, type: checked }).then(res => {
                    let newImg = this.state.photo.concat(res.imgList)
                    this.setState({ photo: newImg, imgCount: res.count })
                })
            }
        }
    }
    addrecomment(id: any) {
        const { rename, reemail, recontent, head2 } = this.state
        const rehead = head2
        const commentId = id
        if (rename !== '' && reemail !== '' && recontent !== '') {
            recommentAdd({ commentId, rename, reemail, recontent, rehead }).then(res => {
            })
            const _id = window.sessionStorage.getItem('userId');
            commentFind({ _id }).then(res => {
                this.setState({ comment: res })
                this.setState({ isemoji1: '', rename: '', reemail: '', recontent: '', iscomment: false })
            })
        }
    }
    addcomment() {
        const artId = window.sessionStorage.getItem('userId'),
            { name, email, content, head1 } = this.state
        const head = head1
        if (name !== '' && email !== '' && content !== '') {
            commentAdd({ name, email, content, head, artId }).then(res => {
            })
            const _id = window.sessionStorage.getItem('userId');
            commentFind({ _id }).then(res => {
                this.setState({ comment: res })
                this.setState({ isemoji: false })
                this.setState({ name: '', content: '', email: '' })
            })
        }
    }
    change(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    change1(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    onChange = (page: any) => {
        this.setState({
            current: page,
        });
        articleFindPage({ page }).then(res => {
            this.setState({ data: res.data })
            this.setState({ count: res.count })
        })
    };
    more = () => {
        let { page, comment } = this.state
        this.setState({ page: page + 1 })
        const _id = window.sessionStorage.getItem('userId');
        commentFind({ _id, page }).then(res => {
            let newArr = comment.data.concat(res.data)
            let newre = comment.commentdata.concat(res.commentdata)
            comment.data = newArr
            comment.commentdata = newre
            this.setState({ comment: comment })
            this.setState({ isemoji: false })
            this.setState({ name: '', content: '', email: '' })
            if (comment.data.length == comment.count) {
                this.setState({ ismore: true })
            }
        })
    }
    listChange = (e: any) => {
        this.setState({ checked: e })
        photolistFind({ type: e }).then(res => {   
            this.setState({ photo: res.imgList, imgCount: res.count })
        })
    }
    //在componentWillUnmount，进行scroll事件的注销
    componentWillUnmount() {
        window.removeEventListener('scroll', this.bindHandleScroll);
    }
    render() {
        const { positionArt, position, link, checked, count, imgList, imgCount, photo, data, article, time, ismore, comment, isemoji, head1, head2, iscomment, isemoji1 } = this.state
        const style = {
            top: '-' + position + 'rem',
        }
        const style1 = {
            top: '-' + positionArt + 'rem',
        }
        const { title, classify, art, tag, tagName, classifyName } = this.props
        {
            switch (title) {
                case '首页': return (
                    <div className="list" style={style}>
                        <div className="list-main">
                            <ul className="list-ul">
                                {(data).map((i: any) => {
                                    return (<li key={i._id}>
                                        <div className="list-img">
                                            <Link to={`/article/${i._id}`} onClick={() => {
                                                window.sessionStorage.setItem('userId', i._id);
                                                window.sessionStorage.setItem('title', i.title)
                                            }}><img src={'http://localhost:4000/' + i.titleImg} alt={i.name}></img></Link>
                                        </div>
                                        <div className="list-text">
                                            <h1><Link to={`/article/${i._id}`} onClick={() => {
                                                window.sessionStorage.setItem('userId', i._id);
                                                window.sessionStorage.setItem('title', i.title)
                                            }}>{i.title}</Link></h1>
                                            <div className="list-desc"><Link to={`/article/${i._id}`} onClick={() => {
                                                window.sessionStorage.setItem('userId', i._id);
                                                window.sessionStorage.setItem('title', i.title)
                                            }}><p>{i.desc}</p></Link></div>
                                            <div className="list-all">
                                                <time><ScheduleOutlined />{i.time}</time>
                                                <div><AppstoreOutlined /><Link to={`/classify/${i.classifyName}`}>{i.classifyName}</Link></div>
                                                <div className="list-tag"><TagsOutlined />{i.tagName.map((item: any, index: any) => {
                                                    return <Link to={`/tag/${item}`} key={index}>{item}</Link>
                                                })}</div>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                            <div className="list-page">
                                <Pagination current={this.state.current} onChange={this.onChange} total={count} />
                            </div>
                        </div>
                    </div>)
                case '关于': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-about">
                                <img src={tou} className="list-about-img"></img>
                                <div className="list-about-p">
                                    <p>续言</p>
                                    <p>个人网站/博客日志/技术文档</p>
                                    <p>欢迎来到续言的个人博客，这是一款基于 react+node 的开源博客，
                                        界面样式借鉴于 <a href="https://hexo.io/zh-cn/" target="_blank" rel="noopener external nofollow noreferrer">Hexo</a> 的 <a href="https://hexo.fluid-dev.com/" target="_blank" rel="noopener external nofollow noreferrer">Material Design</a> 风格。</p>
                                </div>
                                <div className="list-lianxi">
                                    <h2>👋 关于我</h2>
                                    <div className="list-ji">
                                        <p className="list-p">博主 97 年生人，2020 年接触前端，制作博客的初衷是为了锻炼技术，也是为了记录在前端行业自身的发展历程。
                                        博客前端采用 react 框架，class 组件与 hook 组件混搭（就是玩），还加入了 typesrcipt，
                                        后台采用 express 框架，说起来 node.js 写后台就是比 java 香（前端人员角度#^.^#），最后数据库采用 mongoDB，
                                        项目可能不够完美，但也算是博主学完 react 对自身的一个检验。Have a good time. ^_^
                                        </p>
                                    </div>
                                </div>
                                <div className="list-jie">
                                    <h2>🔨 技能栏</h2>
                                    <div className="list-ji">
                                        <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white"></img>
                                        <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white"></img>
                                        <img src="https://img.shields.io/badge/-JavaScript-eed718?style=flat&logo=javascript&logoColor=ffffff"></img>
                                        <img src="https://img.shields.io/badge/-Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white"></img>
                                        <img src="https://img.shields.io/badge/-vue-green?style=flat&logo=javascript&logoColor=ffffff"></img>
                                        <img src="https://img.shields.io/badge/-MongoDB-4DB33D?style=flat&logo=mongodb&logoColor=FFFFFF"></img>
                                        <img src="https://img.shields.io/badge/-Express.js-558ac5?style=flat&logo=Express&logoColor=FFFFFF"></img>
                                        <img src="https://img.shields.io/badge/-Node.js-3C873A?style=flat&logo=Node.js&logoColor=white"></img>
                                        <img src="http://img.shields.io/badge/-Git-F1502F?style=flat&logo=git&logoColor=FFFFFF"></img>
                                        <img src="http://img.shields.io/badge/-Github-000000?style=flat&logo=github&logoColor=FFFFFF"></img>
                                        <img src="http://img.shields.io/badge/-VS%20Code-4DB33D?style=flat&logo=visual%20studio%20code&logoColor=white"></img>
                                        <img src="https://img.shields.io/badge/-react-blue?style=flat&logo=React&logoColor=FFFFFF"></img>
                                    </div>
                                </div>
                                <div className="list-lianxi">
                                    <h2>🤝🏻 联系我</h2>
                                    <div className="list-ji">
                                        <p>邮箱：792703157@qq.com</p>
                                        <p>好友申请请备注：xuyanblog</p>
                                        <p>欢迎技术上的交流！！！</p>
                                        <img src={vx} className="vx"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case '分类': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="list-classify">
                                    <Collapse ghost expandIconPosition="right">
                                        {(classify || []).map((i: any) => {
                                            return (<Panel key={i} header={i}>
                                                {(art || []).map((j: any, index: any) => {
                                                    if (j.classifyName == i) {
                                                        return (<Link to={`/article/${j._id}`} key={index} onClick={() => {
                                                            window.sessionStorage.setItem('userId', j._id);
                                                            window.sessionStorage.setItem('title', j.title)
                                                        }}>
                                                            {j.title}<div style={{ display: "inline-block", float: "right" }}>{j.time}</div></Link>)
                                                    }
                                                    return
                                                })
                                                }
                                            </Panel>)
                                        })}
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case '分类列表': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="list-classifyList">
                                    <p>共计{art.length || []}篇文章</p>
                                    <ul>
                                        {(art || []).map((i: any) => {
                                            return (<Link to={`/article/${i._id}`} key={i._id} onClick={() => {
                                                window.sessionStorage.setItem('userId', i._id);
                                                window.sessionStorage.setItem('title', i.title)
                                            }}><li>
                                                    {i.title}<div style={{ display: "inline-block", float: "right" }}>{i.time}</div></li></Link>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case '归档': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="list-classifyList">
                                    <p>共计{count}篇文章</p>
                                    <ul>
                                        {time.map((i: any, index: any) => {
                                            return <div className="list-divtime" key={index}><span>{i}</span>{data.map((j: any) => {
                                                if (j.time.substr(0, 4) == i) return (<Link to={`/article/${j._id}`} key={j._id} onClick={() => {
                                                    window.sessionStorage.setItem('userId', j._id);
                                                    window.sessionStorage.setItem('title', j.title)
                                                }}><li>
                                                        {j.title}<div style={{ display: "inline-block", float: "right" }}>{j.time.substr(5, j.time.length)}</div></li></Link>)
                                                else return
                                            })}</div>

                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="list-page">
                                <Pagination current={this.state.current} onChange={this.onChange} total={count} />
                            </div>
                        </div>
                    </div>
                )
                case '友链': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-link">
                                {link.map((i: any) => {
                                    return (<a href={i.src} target="_blank" rel="noopener external nofollow noreferrer" key={i._id}>
                                        <img src={'http://localhost:4000/' + i.imgsrc}></img>
                                        <div className="link-div">
                                            <span>{i.link}</span>
                                            <span>{i.content}</span>
                                        </div>
                                    </a>)
                                })}
                            </div>
                        </div>
                    </div>
                )
                case '标签': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="list-tag1">
                                    {(tag || []).map((i: any) => {
                                        return (<Link to={`/tag/${i}`} key={i}><span>{i}</span></Link>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case '相册': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="listA">
                                    {(imgList || []).map((i: any, index: any) => {
                                        return (
                                            <a className="listB" style={{ textDecoration: checked == i.name ? 'underline' : 'none', color: checked == i.name ? '#30a9de' : '' }} key={i._id} onClick={() => { this.listChange(i.name) }}>{i.name}</a>
                                        )
                                    })}
                                </div>

                                <Row style={{ marginTop: "1rem" }}>
                                    <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                                        {(photo || []).map((j: any, index: any) => {
                                            return (<a className="fancy" style={{ display: (index + 1) % 3 == 1 ? 'inlineBlock' : 'none' }}><ReactFancyBox
                                                thumbnail={"http://localhost:4000/" + j.url}
                                                image={"http://localhost:4000/" + j.url} />
                                            </a>
                                            )
                                        })}
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                                        {(photo || []).map((j: any, index: any) => {
                                            return (<a className="fancy" style={{ display: (index + 1) % 3 == 2 ? 'inlineBlock' : 'none' }}><ReactFancyBox
                                                thumbnail={"http://localhost:4000/" + j.url}
                                                image={"http://localhost:4000/" + j.url} />
                                            </a>
                                            )
                                        })}
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                                        {(photo || []).map((j: any, index: any) => {
                                            return (<a className="fancy" style={{ display: (index + 1) % 3 == 0 ? 'inlineBlock' : 'none' }}><ReactFancyBox
                                                thumbnail={"http://localhost:4000/" + j.url}
                                                image={"http://localhost:4000/" + j.url} />
                                            </a>
                                            )
                                        })}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                )
                case '标签列表': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="list-classifyList">
                                    <p>共计{art.length || 0}篇文章</p>
                                    <ul>
                                        {(art || []).map((i: any) => {
                                            return (<Link to={`/article/${i._id}`} key={i._id} onClick={() => {
                                                window.sessionStorage.setItem('userId', i._id);
                                                window.sessionStorage.setItem('title', i.title)
                                            }}><li>{i.title}
                                                    <div style={{ display: "inline-block", float: "right" }}>{i.time}</div></li></Link>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case '文章': return (
                    <div className="list" style={style1}>
                        <div className="list-main">
                            <div className="list-content">
                                <div className="art-cuang" style={{ display: article.original == '转载' ? 'block' : 'none' }}>本文转载自：<a href={article.link} target="_blank" rel="noopener external nofollow noreferrer">{article.link}</a></div>
                                <div className="braft-output-content"
                                    dangerouslySetInnerHTML={{ __html: article ? article.content : '' }}>
                                </div>
                                <div className="art">
                                    <div className="art-tag">
                                        <div className="art-icon">
                                            <AppstoreOutlined style={{ fontSize: '18px' }} />
                                            <Link to={`/classify/${article.classifyName}`}>{article.classifyName}</Link>
                                        </div>
                                        <div className="art-icon">
                                            <TagsOutlined style={{ fontSize: '18px' }} />
                                            {(article.tagName || []).map((i: any) => {
                                                return (<Link to={`/tag/${i}`} key={i}>{i}</Link>)
                                            })}
                                        </div>
                                    </div>
                                    <div className="art-zhuan">转载请注明出处！</div>
                                    <div className="art-input">
                                        <div className="art-in">
                                            <Input bordered={false} placeholder="请留下您的姓名" onChange={this.change} name='name' value={this.state.name}></Input>
                                            <Input bordered={false} placeholder="请留下您的邮箱" onChange={this.change} name='email' value={this.state.email}></Input>
                                            <div className="art-div">
                                                <a onClick={() => { this.setState({ head1: 0 }) }}><img src={boy}></img><span style={{ display: head1 == 0 ? 'block' : 'none' }}></span></a>
                                                <a onClick={() => { this.setState({ head1: 1 }) }}><img src={girl}></img><span style={{ display: head1 == 1 ? 'block' : 'none' }}></span></a>
                                            </div>
                                        </div>
                                        <TextArea placeholder="评论内容" name='content' autoSize={{ minRows: 4, maxRows: 8 }}
                                            onChange={this.change} value={this.state.content} />
                                        <div className="art-click">

                                            <Button type="primary" onClick={this.addcomment}>发送</Button>
                                        </div>

                                    </div>
                                    <div className="art-ping">请不要重复评论！</div>
                                    <div className="comment">

                                        <h2>{comment.count}评论</h2>
                                        <ul>
                                            {(comment.data || []).map((i: any) => {
                                                return (<li key={i._id}>
                                                    <div className='comment-img'>
                                                        <img src={i.head == 0 ? boy : girl}></img>
                                                        <div className="comment-span">
                                                            <span className="comment-name">{i.name}</span>
                                                            <div className="comment-re">
                                                                <span>{i.time}</span>
                                                                <a onClick={() => { this.setState({ iscomment: i._id }) }}>回复</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="comment-content">{i.content}</div>

                                                    <ul>
                                                        {(comment.commentdata || []).map((j: any) => {
                                                            if (i._id == j.commentId) {
                                                                return (<li key={j._id} style={{ marginLeft: '2rem' }}><div className='comment-img' >
                                                                    <img src={j.rehead == 0 ? boy : girl}></img>
                                                                    <div className="comment-span">
                                                                        <span className="comment-name">{j.rename}</span>
                                                                        <div className="comment-re">
                                                                            <span>{j.time}</span>
                                                                            <a onClick={() => { this.setState({ iscomment: i._id }) }}>回复</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                    <div className="comment-content">{j.recontent}</div>
                                                                </li>)
                                                            }
                                                            else return
                                                        })}
                                                    </ul>

                                                    <div style={{ display: iscomment == i._id ? 'block' : 'none' }} className="art-input">
                                                        <a className="cha" onClick={() => { this.setState({ iscomment: '' }) }}>×</a>
                                                        <div className="art-in">
                                                            <Input bordered={false} placeholder="请留下您的姓名" onChange={this.change1} name='rename' value={this.state.rename}></Input>
                                                            <Input bordered={false} placeholder="请留下您的邮箱" onChange={this.change1} name='reemail' value={this.state.reemail}></Input>
                                                            <div className="art-div">
                                                                <a onClick={() => { this.setState({ head2: 0 }) }}><img src={boy}></img><span style={{ display: head2 == 0 ? 'block' : 'none' }}></span></a>
                                                                <a onClick={() => { this.setState({ head2: 1 }) }}><img src={girl}></img><span style={{ display: head2 == 1 ? 'block' : 'none' }}></span></a>
                                                            </div>
                                                        </div>
                                                        <TextArea placeholder="评论内容" name='recontent' autoSize={{ minRows: 4, maxRows: 8 }}
                                                            onChange={this.change1} value={this.state.recontent} />
                                                        <div className="art-click">

                                                            <Button type="primary" onClick={() => { this.addrecomment(i._id) }}>发送</Button>
                                                        </div>

                                                    </div>
                                                </li>)
                                            })}
                                        </ul>

                                        <a className="more" onClick={this.more} style={{ display: comment.count == 0 || ismore ? 'none' : 'inlineBlock' }}>加载更多</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default List