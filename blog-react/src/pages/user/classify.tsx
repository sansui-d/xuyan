import React from 'react';
import { Layout } from 'antd';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import { articleFind, classifyAdd, classifyFind,articleFindTag } from '../../api/api';

class classify extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            classify: null,
            art:null,
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        let data = new Array
        articleFind({}).then(res => {
            this.setState({art:res})
        })
        const classifyName = this.props.match.params.classifyName
        classifyFind({}).then(res=>{
            for(let i of res){
                data.push(i.classifyName)
            }
            this.setState({classify:data})
        })
    }
    render() {
        const title = '分类'
        const { classify,art } = this.state
        return (
            <Layout>
                <Head></Head>
                <Content img="classify"  title={title}></Content>
                <List title={title} classify={classify} art={art}></List>
                <Footer></Footer>
            </Layout>
        )
    }
}

export default classify