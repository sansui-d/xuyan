import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import { articleFindPage } from '../../api/api';

class main extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            art: null,
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        const title = "首页"
        return (
            <Layout>
                <Head></Head>
                <Content img="main" title="欢迎来到续言的个人博客"></Content>
                <List title={title}></List>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default main