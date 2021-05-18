import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Head from '../../components/user/Head'
import Content from '../../components/user/Content'
import List from '../../components/user/List'
import Footer from '../../components/user/Footer'
import {login} from '../../api/api'
import './index.css'
import main from '../../components/main.jpg'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
    let history = useHistory();
    const [user,setUser] = useState('')
    const [pass,setPass] = useState('')
    const onFinish = (values: any) => {
        
    };

    const onFinishFailed = (errorInfo: any) => {
        
    };
    const handleChange = (event: any) => {
        setUser(event.target.value)
    }
    const handleChange1 = (event: any) => {
        setPass(event.target.value)
    }
    const onLogin = ()=>{
        login({user,pass}).then(res=>{
            if(res.code==200){
                window.sessionStorage.setItem('token', res.token)
                window.sessionStorage.setItem('isLogin', '1')
                history.push("/admin/articleList")
            }
        })
    }
    return (
        <div className='back' style={{ backgroundImage: `url(${main})` }}>
            <div className="login">
                <h2>续言个人博客后台登录</h2>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        labelCol={{ span: 4 }}
                        rules={[{ required: true, message: '请输入账号！' }]}
                    >
                        <Input value={user} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        labelCol={{ span: 4 }}
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password value={pass} onChange={handleChange1}/>
                    </Form.Item>
                    <div className="loginbtn">
                        <Button type="primary" htmlType="submit" onClick={onLogin}>
                            登录
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login