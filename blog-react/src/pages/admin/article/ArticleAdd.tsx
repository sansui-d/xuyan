import React from 'react';
import { Input, Select, Button, notification,message } from 'antd';
import { tagFind, classifyFind, articleAdd,imgFind } from '../../../api/api';

import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './art.css'
import classify from '../../user/classify';
import staging from '../staging/staging';

class ArticleAdd extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(null),//内容
            title: '',//标题
            author: '',//作者
            keyword: '',//关键字
            desc: '',//描述
            titleImg: '',//图片链接
            condition: '草稿',//草稿状态
            original: '原创',//原创状态
            tag: [],//标签
            classify: [],//分类
            tagName: [],//标签值
            classifyName: '',//分类值
            imgs:[],
            link:''//转载链接
            // 创建一个空的editorState作为初始
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangecondition = this.handleChangecondition.bind(this);
        this.handleChangeoriginal = this.handleChangeoriginal.bind(this);
        this.handleChangetag = this.handleChangetag.bind(this);
        this.handleChangeclassify = this.handleChangeclassify.bind(this);
    }

    componentWillMount() {
        tagFind({}).then(res => {
            this.setState({ tag: res })
        })
        classifyFind({}).then(res => {
            this.setState({ classify: res })
        })
        imgFind({}).then(res=>{
            this.setState({imgs:res})
        })
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState: any) => {
        this.setState({ editorState })
    }
    handleSubmit() {
        const content = this.state.editorState.toHTML()
        const contentJson = this.state.editorState.toRAW()
        const { title,link, author, keyword, desc, titleImg, condition, original, tagName, classifyName } = this.state
        articleAdd({link, contentJson, title, author, keyword, desc, titleImg, condition, original, tagName, classifyName, content }).then(res => {
            if(res.ok==1){
                this.setState({editorState: BraftEditor.createEditorState(null),desc:'',title:'',link:'',author:'',keyword:'',titleImg:'',tagName:null,classifyName:null})
                message.success('添加成功')
            }else{
                message.error('添加失败')
            }
        })
    }
    handleChange(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleChangecondition(value: any) {
        this.setState({
            condition: value
        })
    }
    handleChangeoriginal(value: any) {
        this.setState({
            original: value
        })
    }
    handleChangetag(value: any) {
        this.setState({
            tagName: value
        })
    }
    handleChangeclassify(value: any) {
        this.setState({
            classifyName: value
        })
    }
    render() {
        const editorState = this.state.editorState
        const { tag, classify,imgs } = this.state
        return (
            <>
                <Input
                    style={{ marginBottom: 10 }}
                    addonBefore="标题"
                    size="large"
                    placeholder="标题"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <Input
                    style={{ marginBottom: 10 }}
                    addonBefore="作者"
                    size="large"
                    placeholder="作者"
                    name="author"
                    value={this.state.author}
                    onChange={this.handleChange}
                />
                <Input
                    style={{ marginBottom: 10 }}
                    addonBefore="关键字"
                    size="large"
                    placeholder="关键字"
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <Input
                    style={{ marginBottom: 10 }}
                    addonBefore="描述"
                    size="large"
                    placeholder="描述"
                    name="desc"
                    value={this.state.desc}
                    onChange={this.handleChange}
                />
                <div className="link"><div className="title">封面链接</div><Select
                    style={{ width: 100 + '%', marginBottom: 20,margin:0}}
                    placeholder="选择封面链接"
                    
                    defaultValue={this.state.titleImg}
                    size="large"
                    onChange={this.handleChangecondition}
                    value={this.state.titleImg}
                    optionLabelProp="label"
                    dropdownRender={i=>(<div>{imgs.map((i:any)=>{
                        return (<a className="addimg" key={i.url}  onClick={()=>{this.setState({titleImg:i.url})}}><img src={'http://localhost:4000/'+i.url}></img></a>)
                    })}
                    </div>)}
                >
                </Select></div>
                

                <Select
                    style={{ width: 200, marginBottom: 20 }}
                    placeholder="选择发布状态"
                    defaultValue={this.state.condition}
                    onChange={this.handleChangecondition}
                >
                    {/*  0 草稿，1 发布 */}
                    <Select.Option value="草稿">草稿</Select.Option>
                    <Select.Option value="发布">发布</Select.Option>
                </Select>


                <Select
                    style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
                    placeholder="选择文章转载状态"
                    defaultValue={this.state.original}
                    onChange={this.handleChangeoriginal}
                >
                    <Select.Option value="原创">原创</Select.Option>
                    <Select.Option value="转载">转载</Select.Option>
                </Select>

                <Input
                    style={{ display:this.state.original=='转载'?'inline-block':'none' ,marginBottom: 10,width: 200,marginLeft:10 }}
                    placeholder="转载链接"
                    name="link"
                    value={this.state.link}
                    onChange={this.handleChange}
                />

                <Select
                    style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
                    placeholder="文章标签"
                    mode="multiple"
                    onChange={this.handleChangetag}
                >
                    {tag.map((item: any, index: any) => (
                        <Select.Option key={index} value={item.tagName}>{item.tagName}</Select.Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
                    placeholder="文章分类"
                    onChange={this.handleChangeclassify}
                >
                    {classify.map((item: any, index: any) => (
                        <Select.Option key={index} value={item.classifyName}>{item.classifyName}</Select.Option>
                    ))}
                </Select>
                <div>
                    <Button
                        onClick={() => {
                            this.handleSubmit();
                        }}
                        // loading={this.state.loading}
                        style={{ marginBottom: '10px' }}
                        type="primary"
                    >
                        提交
      </Button>
                </div>
                <div title="添加与修改文章" style={{ width: "100%" }}>
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                    />
                </div>
            </>
        )
    }
}

export default ArticleAdd