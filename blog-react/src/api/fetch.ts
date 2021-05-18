import { message } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import resolve from 'resolve';

const Request = (url: string, config: any) => {
  return fetch(url, config).then((res: any) => {
    if (!res.ok) {
      // 服务器异常返回
      if(res.status==401){
        message.error('token过期，请重新登录！')
        window.location.href = '/login';
      }
      throw Error('');
    }
    return res.json();
  }).then((resJson: any) => {
    // if (xxx) {
    //   // 项目内部认为的错误
    //   throw Error('');
    // } else {
    return resJson;
    // }
  }).catch((error: any) => {
    // 公共错误处理
    message.error('服务器错误，请稍后再试！');
  });
};

// GET请求
export const get = (url: string, params: any) => {
  let token = window.sessionStorage.getItem('token')
  if (params) {
    let paramsArray = new Array;
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return Request(url, {
    method: 'GET',
    headers: {
      'Authorization':`Bearer `+token
    },
  });
};

// POST请求
export const post = (url: string, data: any) => {
  let token = window.sessionStorage.getItem('token')
  return Request(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer `+token
    },
    method: 'POST'
  });
};