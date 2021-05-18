import { Layout, Menu, Breadcrumb,message } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import './home.css'
import Route from './router/index'
import { NavLink,useHistory,Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo() {
  let history = useHistory();
  console.log(history)
  let login = window.sessionStorage.getItem('isLogin');
  if(login!=='1'){
    message.info('您还未登录，请登录')
    history.push('/login')
  }
  const [collapsed, setcollapsed] = useState(false)
  const onCollapse = (collapsed: any) => {
    setcollapsed(collapsed)
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <div>续言博客后台</div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub3" icon={<TeamOutlined />} title="文章">
            <Menu.Item key="3"><NavLink to="/admin/articleList">文章列表</NavLink></Menu.Item>
            <Menu.Item key="4"><NavLink to="/admin/articleAdd">文章创作</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<UserOutlined />} title="留言">
            <Menu.Item key="5"><NavLink to="/admin/message">留言列表</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub99" icon={<UserOutlined />} title="相册">
            <Menu.Item key="99"><NavLink to="/admin/photo">首页相册</NavLink></Menu.Item>
            <Menu.Item key="101"><NavLink to="/admin/img">友链相册</NavLink></Menu.Item>
            <Menu.Item key="105"><NavLink to="/admin/imgList">标签相册</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<UserOutlined />} title="标签">
            <Menu.Item key="6"><NavLink to="/admin/tag">标签列表</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<UserOutlined />} title="分类">
            <Menu.Item key="8"><NavLink to="/admin/classify">分类列表</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<UserOutlined />} title="友情链接">
            <Menu.Item key="7"><NavLink to="/admin/link">链接列表</NavLink></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <div className="today">今天也是充满希望的一天</div>
          <div className="admin">Hello,续言<Link to="/login">退出</Link></div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{history.location.pathname}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Route/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>续言博客</Footer>
      </Layout>
    </Layout >
  );
}


export default SiderDemo
