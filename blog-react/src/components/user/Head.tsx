import React from 'react';
import './home.css'
import { Link } from 'react-router-dom'
import {
    HomeOutlined, CalendarOutlined, AppstoreOutlined, TagsOutlined, UserOutlined,
    LinkOutlined, PictureOutlined, SearchOutlined,
} from '@ant-design/icons';

class Head extends React.Component<any, any> {
    timer1: any
    timer2: any
    constructor(props: any) {
        super(props)
        this.state = {
            height:4
        }
    }
    componentDidMount() {
        //绑定事件
        window.addEventListener('scroll', this.bindHandleScroll)
    }
    bindHandleScroll = (event: any) => {
        // 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        if (scrollTop > 100) {
            this.setState({
                height:3
            })
        } else{
            this.setState({
                height:4
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.bindHandleScroll)
    }

    render() {
        let {height} = this.state
        let nav = {
            height:height+'rem',
            background: height === 3 ? 'rgba(47,65,84,0.7)' : ''
        }
        return (
            <div className="nav">
                <div className="nav-flex" style={nav}>
                    <div className="nav-title">
                    <Link to="/">续言</Link>
                    </div>
                    <div className="nav-ul">
                        <ul>
                            <li><Link to="/"><HomeOutlined />首页</Link></li>
                            <li><Link to="/file"><CalendarOutlined />归档</Link></li>
                            <li><Link to="/classify"><AppstoreOutlined />分类</Link></li>
                            <li><Link to="/tag"><TagsOutlined />标签</Link></li>
                            <li><Link to="/photoList"><PictureOutlined />相册</Link></li>
                            <li><Link to="/about"><UserOutlined />关于</Link></li>
                            <li><Link to="/link"><LinkOutlined />友链</Link></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Head