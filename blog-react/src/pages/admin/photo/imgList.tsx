import React from 'react';
import { Upload, Popconfirm, Modal, message, Button, Radio, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { listAdd, listFind, listDelete, imgLinkAdd, imgLinkFind, imgLinkDelete, imgListAdd, imgListFind, imgListDelete } from '../../../api/api';
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

class ImgList extends React.Component {
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
        a: '',
        items: ['jack', 'lucy'],
        name: '',
        defa: null,
        isModalVisible: false,
        isModalVisible2: false,
        input: '',
        radioList: [],
        d: 'a',
    };
    componentDidMount() {
        this.init1()
    }
    init1() {
        listFind({}).then(res => {
            if(res.length!==0){
            this.setState({ d: res[0].name, radioList: res })
            imgListFind({type:res[0].name}).then(res => {
                this.setState({ url: res })
            })
        }
        })
    }
    init(t:any) {
        const type = this.state.defa
        imgListFind({type}).then(res => {
            this.setState({ url: res })
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file: any) => {
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
        console.log({ fileList })
        if(this.state.defa==null){
            message.info('请选择相册分类')
        }else{
            if (fileList.length == 1) { 
                fileList[0].status = 'done' 
                getBase64(fileList[0].originFileObj).then(res=>{
                    fileList[0].base = res
                })
            }
            this.setState({ fileList });
        }
    };
    handledelete = (url: any) => {
        imgListDelete({ url }).then(res => {
            const t = this.state.defa
            this.init(t)
            message.success('删除成功')
        })
    }
    doImgUpload = (options: any) => {

    };
    add = () => {
        const { fileList } = this.state
        const type = this.state.defa
        if (fileList.length == 1) {
            imgListAdd({ fileList,type }).then(res => {
                this.setState({ fileList: [] });
                const t = this.state.defa
                this.init(t);
                message.success('添加成功')
            })
        } else {
            message.info('请添加图片')
        }
    }
    block = () => {
        this.setState({ isModalVisible: true })
    }
    change = (e: any) => {
        this.setState({ defa: e.target.value,d:e.target.value })
        console.log(e.target.value)
        imgListFind({type:e.target.value}).then(res => {
            this.setState({ url: res })
        })
    }
    handleOk = () => {
        const name = this.state.input
        listAdd({ name }).then(res => {
            console.log(res)
            this.setState({ isModalVisible: false, input: '' })
            this.init1()
            message.success('添加成功')
        })
    }
    handleOk2 = () => {
        const name = this.state.defa
        listDelete({ name }).then(res => {
            this.setState({ isModalVisible2: false })
            message.success('删除成功')
        })
    }
    handleCancel1 = () => {
        this.setState({ isModalVisible: false, isModalVisible2: false, input: '' })
    }
    handleChange1 = (e: any) => {
        this.setState({ input: e.target.value })
    }
    de = () => {
        if (this.state.defa !== null) {
            this.setState({ isModalVisible2: true })
        }else{
            message.info('请选择相册分类')
        }
    }
    render() {
        const { previewVisible, d, defa, radioList, previewImage, input, isModalVisible, fileList, previewTitle, url, items, name } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <div>
                <div className="btn">
                    <Button type="primary" onClick={this.block}>添加相册分类</Button>
                    <Button type="primary" onClick={this.de}>删除相册分类</Button>
                    <br />
                    <Radio.Group value={d} buttonStyle="solid" onChange={this.change}>
                        {radioList.map((i: any) => {
                            return (<Radio.Button value={i.name} key={i._id}>{i.name}</Radio.Button>)
                        })}
                    </Radio.Group>
                </div>

                <div className="box">
                    {(url||[]).map((i: any) => {
                        return (<div className="item" key={i._id}>
                            <Popconfirm title="确定删除此图片？" onConfirm={() => { this.handledelete(i.url) }} okText="删除" cancelText="取消">
                                <a className="item-div">删除</a>
                                <img key={i.name} src={'http://localhost:4000/' + i.url} >
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
                <Modal title="添加相册" visible={isModalVisible}
                    okText='添加' cancelText="取消" onOk={this.handleOk} onCancel={this.handleCancel1}>
                    <Input
                        addonBefore="相册分类"
                        size="large"
                        placeholder="相册分类"
                        name="tag"
                        value={input}
                        onChange={this.handleChange1}
                    />
                </Modal>
                <Modal title="删除标签" visible={this.state.isModalVisible2} okText='删除' cancelText="取消" onOk={this.handleOk2} onCancel={this.handleCancel1}>
                    <p>确定删除相册分类:{defa}?</p>
                </Modal>
            </div >
        );
    }
}
export default ImgList