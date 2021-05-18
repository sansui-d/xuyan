import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Modal, message,Switch  } from 'antd';
import { articleFind, articleDelete,articleUpdCon } from "../../../api/api"
import { Link } from 'react-router-dom'
const { confirm } = Modal;
function ArticleList() {
  const [article, setArticle] = useState([]);
  const [a, setA] = useState(0)
  useEffect(() => {
    articleFind({}).then(res => {
      console.log(res)
      setArticle(res)
    })
  }, [a])
  const DeleteArt = (text:any) =>{
    confirm({
      title: `确定删除'${text.title}'这篇文章？`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const { _id, tagName, classifyName } = text
        articleDelete({ _id, tagName, classifyName })
          .then(res => {
            if (res.ok === 1) { message.success('删除成功'); setA(a+1) }
            else { message.error('删除失败') }
          })
      },
      onCancel() {
        message.warning('已取消删除')
      },
    });
  }
  const conchange = (t:any) =>{
    let {condition,_id} = t
    condition = condition=='发布'?'草稿':'发布'
    articleUpdCon({condition,_id}).then(res=>{
        if(res.ok == 1){
          setA(a+1)
        }
        console.log(res)
    })
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '封面',
      dataIndex: 'titleImg',
      key: 'titleImg',
    },
    {
      title: '标签',
      key: 'tagName',
      dataIndex: 'tagName',
      render: (tagName: any) => (
        <>
          {tagName.map((tagName: any) => {
            return (
              <Tag key={tagName}>
                {tagName.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '分类',
      key: 'classifyName',
      dataIndex: 'classifyName',
    },
    {
      title: '状态',
      dataIndex: 'condition',
      key: 'condition',
      render:(text:any,t:any) => <Switch checkedChildren="发布" unCheckedChildren="草稿"
      checked={text=='发布'?true:false}  onChange={()=>{conchange(t)}}></Switch>
    },
    {
      title: '观看/评论',
      dataIndex: 'watch',
      key: 'watch',
      render: (text: any) => <>{text.join("/")}</>,
    },
    {
      title: '原创状态',
      dataIndex: 'original',
      key: 'original',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: '_id',
      render: (text: any) => (
        <Space size="middle">
          <Link to="/admin/articleUpt" onClick={() => { window.sessionStorage.setItem('adminid', text._id); }}>修改/详情</Link>
          <a onClick={() => DeleteArt(text)}>删除</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={article} rowKey='_id' />
    </>
  )
}

export default ArticleList