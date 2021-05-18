import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'

class about extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        const title = '关于'
        return (
            <Layout>
                <Head></Head>
                <Content img="about" title={title}></Content>
                <List title={title}></List>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default about