import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import { tagFind,articleFindTag } from '../../api/api';


class tagList extends React.Component<any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            tag: [],
            art:[],
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
        const tagName = this.props.match.params.tagName
        articleFindTag({tagName}).then(res=>{
            this.setState({art:res})
        })
    }
    render() {
        let title = "标签列表"
        const {tag,art,tagName} = this.state
        let a = '标签-' + this.props.match.params.tagName
        return (
            <Layout>
                <Head></Head>
                <Content img="tagList" title={a} tagName={this.props.match.params.tagName}></Content>
                <List title={title} tag={tag} tagName={this.props.match.params.tagName} art={art}></List>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default tagList