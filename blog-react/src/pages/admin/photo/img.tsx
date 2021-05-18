import React from 'react';
import { Upload, Popconfirm ,Modal,message,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { imgLinkAdd,imgLinkFind,imgLinkDelete } from '../../../api/api';
import './index.css'

// 这里时图片格式得转换，具体看需要那种格式，返回promise
function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class Img extends React.Component {
    state = {
        // 预览开关
        previewVisible: false,
        // 预览图
        previewImage: '',
        // 预览标题
        previewTitle: '',
        // 图片信息
        fileList: [],
        url: [],
        a:''
    };
    componentDidMount() {
        this.init()
    }
    init(){
        imgLinkFind({}).then(res=>{
            this.setState({url:res})
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file: any) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            // 设置预览出现的条件
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        });
    };

    handleChange = ({ fileList }: any) => {
        if(fileList.length == 1){
            fileList[0].status = 'done'
            getBase64(fileList[0].originFileObj).then(res=>{
                fileList[0].base = res
            })
        }
        this.setState({ fileList });
    };
    handledelete = (url:any)=>{
        imgLinkDelete({url}).then(res=>{
            this.init()
            message.success('删除成功')
        })
    }
    doImgUpload = (options:any) => {
        console.log(options)
    };
    add = () =>{
        const {fileList} = this.state
        if(fileList.length == 1){
            imgLinkAdd({ fileList }).then(res => {
                this.setState({fileList:[]});
                this.init();
                message.success('添加成功') })
        }else{
            message.info('请添加图片')
        }
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle, url } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <div>
                <div className="box">
                    {(url||[]).map((i:any)=>{
                        return (<div className="item" key={i._id}>
                            <Popconfirm title="确定删除此图片？" onConfirm={()=>{this.handledelete(i.url)}} okText="删除" cancelText="取消">
                            <a className="item-div">删除</a>
                            <img key={i.name} src={'http://localhost:4000/'+i.url} >
                            </img></Popconfirm></div>)
                    })}
                </div>
                <Upload
                    action="2"
                    listType="picture-card"
                    // 已经上传的文件列表
                    customRequest={this.doImgUpload}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}

                </Upload>
                <Button type="primary" onClick={this.add}>添加</Button>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div >
        );
    }
}
export default Img