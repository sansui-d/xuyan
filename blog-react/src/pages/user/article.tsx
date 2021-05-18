import React from 'react';
import { Layout, BackTop } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import { articleFindId } from '../../api/api'
import './index.css'

class article extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            article: {},
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        console.log(1)
    }
    render() {
        const title = '文章'
        let { article } = this.state
        return (
            <Layout>
                <Head></Head>
                <Content img="article" title={title} article={article}></Content>
                <List title={title} article={article}></List>
                <BackTop>
                    <div className='up'>UP</div>
                </BackTop>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default article