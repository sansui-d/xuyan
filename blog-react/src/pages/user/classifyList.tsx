import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import { articleFind, classifyAdd, classifyFind,articleFindClassify } from '../../api/api';

class classifyList extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            classify: [],
            art:[],
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        let data = new Array
        classifyFind({}).then(res=>{
            let data = []
            for(let i of res){
                data.push(i.classifyName)
            }
            this.setState({classify:data})
        })
        const classifyName = this.props.match.params.classifyName
        articleFindClassify({classifyName}).then(res=>{
            this.setState({art:res})
        })
    }
    render() {
        const title = '分类列表'
        const { classify,art } = this.state
        let a = '分类-' + this.props.match.params.classifyName
        console.log(this.state)
        return (
            <Layout>
                <Head></Head>
                <Content img="classifyList"  title={a}></Content>
                <List title={title} classify={classify} classifyName={this.props.match.params.classifyName} art={art}></List>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default classifyList