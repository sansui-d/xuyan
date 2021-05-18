import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Input, message } from 'antd';
import { classifyAdd, classifyFind, classifyUpd, classifyDelete } from '../../../api/api';

function ClassifyList() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [data, setData] = useState([])
    const [input, setInput] = useState('')
    const [classify, setClassify] = useState(Object)
    const [a, setA] = useState(0)

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModal1 = (record: any) => {
        setIsModalVisible1(true);
        setClassify(record)
        const classifyName = record.classifyName
        setInput(classifyName)
    };
    const showModal2 = (record: any) => {
        setIsModalVisible2(true);
        setClassify(record)
    };

    const handleOk = () => {
        const classifyName = input
        classifyAdd({ classifyName }).then(res => {
            if (res.ok == 1) {
                setInput('')
                setA(a + 1)
                setIsModalVisible(false);
                message.success('添加成功')
            } else {
                message.error('添加失败')
            }

        })

    };
    const handleOk1 = () => {
        const id = classify._id
        const classifyName = input
        classifyUpd({ id, classifyName }).then(res => {
            if (res.ok == 1) {
                setInput('')
                setClassify(Object)
                setA(a + 1)
                setIsModalVisible1(false);
                message.success('修改成功')
            } else {
                message.error('修改失败')
            }

        })
    };
    const handleOk2 = () => {
        const id = classify._id
        classifyDelete({ id }).then(res => {
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
        setIsModalVisible(false);
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    const handleChange = (event: any) => {
        setInput(event.target.value)
    }
    useEffect(() => {
        classifyFind({}).then(res => {
            setData(res)
        })
    }, [a])
    const columns = [
        {
            title: '分类',
            dataIndex: 'classifyName',
            key: 'classifyName',
        },
        {
            title: '文章数',
            dataIndex: 'num',
            key: 'num',
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
                    <a onClick={() => showModal1(record)}>修改</a>
                    <a onClick={() => showModal2(record)}>删除</a>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Button
                onClick={showModal}
                // loading={this.state.loading}
                style={{ marginBottom: '10px' }}
                type="primary"
            >
                新增
      </Button>
            <Table columns={columns} dataSource={data} rowKey='_id'//因为数据不多，这里用table默认的自动分页
            />
            <Modal title="添加分类" visible={isModalVisible} okText='添加' cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                <Input
                    addonBefore="分类"
                    size="large"
                    placeholder="分类"
                    name="tag"
                    value={input}
                    onChange={handleChange}
                />
            </Modal>
            <Modal title="修改分类" visible={isModalVisible1} okText='修改' cancelText="取消" onOk={handleOk1} onCancel={handleCancel}>
                <Input
                    addonBefore="分类"
                    size="large"
                    placeholder="分类"
                    name="tag"
                    value={input}
                    onChange={handleChange}
                />
            </Modal>
            <Modal title="删除分类" visible={isModalVisible2} okText='删除' cancelText="取消" onOk={handleOk2} onCancel={handleCancel}>
                <p>确定删除分类:{classify.tagName}?</p>
                <p style={{ fontSize: '1px', color: 'red' }}>注意:文章数不为0的分类不能删除</p>
            </Modal>
        </>
    )
}

export default ClassifyList