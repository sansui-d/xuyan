import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import { tagFind } from '../../api/api';


class tag extends React.Component<any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            tag: null,
            art:null,
            tagName:null
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        tagFind({}).then(res=>{
            let data = []
            for(let i of res){
                data.push(i.tagName)
            }
            this.setState({tag:data})
        })
    }
    render() {
        let title = "标签"
        const {tag,art} = this.state
        
        return (
            <Layout>
                <Head></Head>
                <Content img="tag" title={title}></Content>
                <List title={title} tag={tag}></List>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default tag