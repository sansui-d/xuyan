import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Input, message } from 'antd';
import { recommentDelete, commentFindAll, commentDelete,recommentFindOne } from '../../../api/api';

function Message(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [data, setData] = useState([])
    const [data1, setData1] = useState(new Array)
    const [input, setInput] = useState('')
    const [input1, setInput1] = useState('')
    const [classify, setClassify] = useState(Object)
    const [a, setA] = useState(0)
    const [look,setlook] =useState(new Array)

    const showModal1 = (record: any) => {
        setIsModalVisible1(true);
        setClassify(record)
    };
    const showModal2 = (record: any) => {
        setIsModalVisible2(true);
        setClassify(record)
    };
    const handleOk1 = () => {
        const _id = classify._id
        recommentDelete({ _id }).then(res => {
            if (res.ok == 1) {
                let newlook = []
                for(let i of data1){
                    if(i._id!==_id){
                        newlook.push(i)
                    }
                }
                setlook(newlook)
                setA(a + 1)
                setClassify(Object)
                setIsModalVisible1(false);
                message.success('删除成功')
            } else {
                message.error('删除失败')
            }
        })
    }
    const handleOk2 = () => {
        const _id = classify._id
        commentDelete({ _id }).then(res => {
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
    const expand = (event: any,record:any) => {
        const commentId = record._id
        recommentFindOne({commentId}).then(res=>{
            setData1(res)
        })
        let tem = new Array
        tem.push(commentId)
        setlook(tem)
    }
    useEffect(() => {
        commentFindAll({}).then(res => {
            setData(res)
            console.log(res)
        })
    }, [a])
    const columns = [
        {
            title: '评论者姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '评论内容',
            dataIndex: 'content',
            key: 'content',
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
    const expandedRowRender = ()=>{
        const columns = [
            {
                title: '回复者姓名',
                dataIndex: 'rename',
                key: 'rename',
            },
            {
                title: '邮箱',
                dataIndex: 'reemail',
                key: 'reemail',
            },
            {
                title: '回复内容',
                dataIndex: 'recontent',
                key: 'recontent',
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
                        <a onClick={() => showModal1(record)}>删除</a>
                    </Space>
                ),
            },
        ];
        return <Table columns={columns} dataSource={data1} pagination={false} rowKey='_id'/>
    }
    return (
        <>
            <Table onExpand={expand} expandedRowKeys={look} expandable={{expandedRowRender}} columns={columns} dataSource={data} rowKey='_id'//因为数据不多，这里用table默认的自动分页
            />
            <Modal title="删除评论" visible={isModalVisible1} okText='删除' cancelText="取消" onOk={handleOk1} onCancel={handleCancel}>
                <p>确定删除 {classify.rename} 的回复?</p>
            </Modal>
            <Modal title="删除评论" visible={isModalVisible2} okText='删除' cancelText="取消" onOk={handleOk2} onCancel={handleCancel}>
                <p>确定删除 {classify.name} 的评论?</p>
            </Modal>
        </>
    )
}

export default Message