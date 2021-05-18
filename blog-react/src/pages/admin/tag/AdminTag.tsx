import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Input, message } from 'antd';
import { tagAdd, tagFind, tagUpd, tagDelete } from '../../../api/api';

function TagList() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [data, setData] = useState([])
    const [input, setInput] = useState('')
    const [tag, setTag] = useState(Object)
    const [a, setA] = useState(0)

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModal1 = (record: any) => {
        setIsModalVisible1(true);
        setTag(record)
        const tagName = record.tagName
        setInput(tagName)
    };
    const showModal2 = (record: any) => {
        setIsModalVisible2(true);
        setTag(record)
    };

    const handleOk = () => {
        const tagName = input
        tagAdd({ tagName }).then(res => {
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
        const id = tag._id
        const tagName = input
        tagUpd({ id, tagName }).then(res => {
            if (res.ok == 1) {
                setInput('')
                setTag(Object)
                setA(a + 1)
                setIsModalVisible1(false);
                message.success('修改成功')
            } else {
                message.error('修改失败')
            }

        })
    };
    const handleOk2 = () => {
        const id = tag._id
        tagDelete({ id }).then(res => {
            if (res.ok == 1) {
                setA(a + 1)
                setTag(Object)
                setIsModalVisible2(false);
                message.success('删除成功')
            } else {
                message.error('删除失败')
            }
        })
    }
    const handleCancel = () => {
        setTag(Object)
        setInput('')
        setIsModalVisible(false);
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    const handleChange = (event: any) => {
        setInput(event.target.value)
    }
    useEffect(() => {
        tagFind({}).then(res => {
            setData(res)
        })
    }, [a])
    const columns = [
        {
            title: '标签',
            dataIndex: 'tagName',
            key: 'tagName',
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
            <Modal title="添加标签" visible={isModalVisible} okText='添加' cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                <Input
                    addonBefore="标签"
                    size="large"
                    placeholder="标签"
                    name="tag"
                    value={input}
                    onChange={handleChange}
                />
            </Modal>
            <Modal title="修改标签" visible={isModalVisible1} okText='修改' cancelText="取消" onOk={handleOk1} onCancel={handleCancel}>
                <Input
                    addonBefore="标签"
                    size="large"
                    placeholder="标签"
                    name="tag"
                    value={input}
                    onChange={handleChange}
                />
            </Modal>
            <Modal title="删除标签" visible={isModalVisible2} okText='删除' cancelText="取消" onOk={handleOk2} onCancel={handleCancel}>
                <p>确定删除标签:{tag.tagName}?</p>
                <p style={{ fontSize: '1px', color: 'red' }}>注意:文章数不为0的标签不能删除</p>
            </Modal>
        </>
    )
}

export default TagList