import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Input, message, Select } from 'antd';
import { linkAdd, linkFind, linkDelete, imgLinkFind } from '../../../api/api';

function AdminLink() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [data, setData] = useState([])
    const [input, setInput] = useState('')
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [imgs, setimgs] = useState([])
    const [classify, setClassify] = useState(Object)
    const [a, setA] = useState(0)

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModal2 = (record: any) => {
        setIsModalVisible2(true);
        setClassify(record)
    };

    const handleOk = () => {
        const link = input, src = input1,imgsrc = input3,content = input2
        linkAdd({ link, src,imgsrc,content }).then(res => {
            if (res.ok == 1) {
                setInput('')
                setInput1('')
                setInput2('')
                setInput3('')
                setA(a + 1)
                setIsModalVisible(false);
                message.success('添加成功')
            } else {
                message.error('添加失败')
            }

        })

    };
    const handleOk2 = () => {
        const id = classify._id
        linkDelete({ id }).then(res => {
            if (res.ok == 1) {
                setA(a + 1)
                setClassify(Object)
                setIsModalVisible2(false);
                message.success('删除成功')
            } else {
                message.error('删除失败')
            }
        })
    }
    const handleCancel = () => {
        setClassify(Object)
        setInput('')
        setInput1('')
        setInput2('')
        setInput3('')
        setIsModalVisible(false);
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    const handleChange = (event: any) => {
        setInput(event.target.value)
    }
    const handleChange1 = (event: any) => {
        setInput1(event.target.value)
    }
    const handleChange2 = (event: any) => {
        setInput2(event.target.value)
    }
    const handleChange3 = (event: any) => {
        setInput3(event.target.value)
    }
    useEffect(() => {
        linkFind({}).then(res => {
            setData(res)
        })
        imgLinkFind({}).then(res => {
            setimgs(res)
        })
    }, [a])
    const columns = [
        {
            title: '友链名称',
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: '友链内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '友链地址',
            dataIndex: 'src',
            key: 'src',
        },
        {
            title: '友链图片',
            dataIndex: 'imgsrc',
            key: 'imgsrc',
        },
        {
            title: '创建时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '操作',

            render: (record: any) => (
                <Space size="middle">
                    <a onClick={() => showModal2(record)}>删除</a>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Button
                onClick={showModal}
                // loading={this.state.loading}s
                style={{ marginBottom: '10px' }}
                type="primary"
            >
                新增
            </Button>
            <Table columns={columns} dataSource={data} rowKey='_id'//因为数据不多，这里用table默认的自动分页
            />
            <Modal title="添加友链" visible={isModalVisible} okText='添加' cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                <Input
                    addonBefore="友链名称"
                    size="large"
                    placeholder="友链名称"
                    name="link"
                    value={input}
                    onChange={handleChange}
                />
                <Input
                    addonBefore="友链地址"
                    size="large"
                    placeholder="友链地址"
                    name="src"
                    value={input1}
                    onChange={handleChange1}
                />
                <Input
                    addonBefore="友链介绍"
                    size="large"
                    placeholder="友链介绍"
                    name="comtent"
                    value={input2}
                    onChange={handleChange2}
                />
                <div className="link"><div className="title">封面链接</div>
                    <Select
                        style={{ width: 100 + '%', marginBottom: 20, margin: 0 }}
                        placeholder="选择封面链接"
                        size="large"
                        onChange={handleChange3}
                        value={input3}
                        optionLabelProp="label"
                        dropdownRender={i => (<div>{imgs.map((i: any) => {
                            return (<a key={i._id} onClick={() => { setInput3(i.url) }}><img src={'http://localhost:4000/' + i.url}></img></a>)
                        })}
                        </div>)}
                    ></Select></div>
            </Modal>
                <Modal title="删除友链" visible={isModalVisible2} okText='删除' cancelText="取消" onOk={handleOk2} onCancel={handleCancel}>
                    <p>确定删除友链:{classify.link}?</p>
                </Modal>
        </>
    )
}

export default AdminLink