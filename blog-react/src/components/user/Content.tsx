import React from 'react';
import './home.css'
import main from '../main.jpg';
import about from '../about.jpg';
import classify from '../classify.jpg';
import file from '../file.jpg';
import link from '../link.jpg';
import tag from '../tag.jpg';
import tagList from '../tagList.jpg';
import classifyList from '../classifyList.jpg';
import article from '../article.jpg';
import photoList from '../photoList.jpg';
import { post } from '../../api/fetch';
import { articleAdd, articleFindId } from '../../api/api';
import {
    EditFilled, ScheduleOutlined, CopyOutlined, EyeOutlined, CaretDownOutlined
} from '@ant-design/icons';
import { stringify } from 'node:querystring';
import { message } from 'antd';

interface IImg {
    img: any,
    title: any,
    article?: any,
    tagName?: any,
}

class Content extends React.Component<IImg, any>{
    timer1: any
    timer2: any
    constructor(props: any) {
        super(props);
        this.state = {
            img: '',
            text: '',
            title: '',
            tagName: '',
            name: '',
            article: {}
        }
    }
    componentWillMount() {
        this.img()
        if (this.props.title == '文章') {
            let a = window.location.pathname
            let name = a.substring(a.lastIndexOf("/") + 1);
            articleFindId({ _id: name }).then((res) => {
                    this.setState({ article: res })
                    window.sessionStorage.setItem('title', res.title)
            })
        }
        this.time()
    }
    //图片判断
    img() {
        const { img } = this.props
        switch (img) {
            case 'main': this.setState({ img: main }); break;
            case 'about': this.setState({ img: about }); break;
            case 'classify': this.setState({ img: classify }); break;
            case 'file': this.setState({ img: file }); break;
            case 'link': this.setState({ img: link }); break;
            case 'tag': this.setState({ img: tag }); break;
            case 'tagList': this.setState({ img: tagList }); break;
            case 'classifyList': this.setState({ img: classifyList }); break;
            case 'article': this.setState({ img: article }); break;
            case 'photoList': this.setState({ img: photoList }); break;
        }
    }
    //文字依次加载,闪烁_
    time() {
        let i = 0, t = this.props.title
        if (t == '文章') {
            t = window.sessionStorage.getItem('title') || ''
        }
        this.timer1 = setInterval(() => {
            this.setState({
                text: t.substring(0, i),
            })
            if (this.state.text.length === t.length) {
                clearInterval(this.timer1)
            }
            i++
        }, 200)
    }
    down(event: any) {
        console.log(event)
        window.scrollBy({
            top: event.clientY,
            behavior: "smooth"
        });
    }
    componentWillUnmount() {
        clearInterval(this.timer1)
    }
    render() {
        let { text, article } = this.state
        const { tagName, img } = this.props
        let { author, time, original, watch } = article ? article : ''
        const bg = {
            backgroundImage: `url(${this.state.img})`
        }
        {
            if (img == 'article') {
                return (
                    <div className="con1" style={bg}>
                        <div className="con-bg">
                            <div className="con-all">
                                <div className="con-t">
                                    <div className="con-text">{text}</div>
                                    <div className="con-dian">_</div>
                                </div>
                                <div className="con-tt">
                                    <p><EditFilled />{author}<ScheduleOutlined />{time}</p>
                                    <p><CopyOutlined />{original}<EyeOutlined />{watch ? watch[0] : 0}次</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else if (img == 'main') {
                return (
                    <div className="con" style={bg}>
                        <div className="con-bg">
                            <div className="con-text">{text}</div>
                            <div className="con-dian">_</div>
                            <div className="scroll-down-bar">
                                <div onClick={this.down}><CaretDownOutlined /></div>
                            </div>

                        </div>
                    </div>
                )
            }
            else if (img == 'classify' || img == 'classifyList') {
                return (
                    <div className="con2" style={bg}>
                        <div className="con-bg">
                            <div className="con-text">{text}</div>
                            <div className="con-dian">_</div>
                        </div>
                    </div>
                )
            }
            else if (img == 'tag' || img == 'tagList' || img == 'photoList') {
                return (
                    <div className="con2" style={bg}>
                        <div className="con-bg">
                            <div className="con-text">{text}</div>
                            <div className="con-dian">_</div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="con1" style={bg}>
                        <div className="con-bg">
                            <div className="con-text">{text}</div>
                            <div className="con-dian">_</div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default Content

