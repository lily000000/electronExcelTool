import axios from 'axios'
import Cookie from "./cookie";
import localDb from "./localDb";

// import 'whatwg-fetch';
//import { Loading, Message } from 'element-ui';
const instance = axios.create({
  // baseURL:Cookie.getCookie('ip')?Cookie.getCookie('ip'):'http://192.168.50.135:8080', // 测试环境
  // baseURL:localDb.get('ip') ? `http://${localDb.get('ip')}`:'http://192.168.50.135:8080', // 测试环境
  baseURL:localDb.get('ip') ? `http://${localDb.get('ip')}`:'http://192.168.50.147:8080', // 测试环境

  //baseURL:'http://192.168.20.100', // api的前缀
  //baseURL:'http://192.168.0.69:8080', // api的前缀
  //baseURL:'http://47.99.115.207:9090', // api的前缀
  //timeout: 5000 // 设置请求超市
})
// var loading=''

// 请求拦截添加头部参数等
instance.interceptors.request.use(config => {
 //开始
  config.maxContentLength = Infinity;
  config.baseURL =localDb.get('ip') ? `http://${localDb.get('ip')}`:'http://192.168.50.147:8080';
  // console.log(config);
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(
  response => {
    switch (response.data.status) {
      case 200:
        return response.data;
      case 401:     
      case 403:    
        return;
      default:
        // Message({
        //   type: 'warning',
        //   message: response.data.msg,
        // })
        return Promise.reject('error');
    }
  },
  error => {
   console.log('err' + error)
    return Promise.reject(error)
  })
const http = {
  post(url, data, callback) {
    return instance({
      url,
      data,
      method: 'post',
    })
  },
  get(url, params) {
    // console.log(url, params)
    return instance({
      url,
      params,
      method: 'get',
    })
  },
  postFormData(url,data){
    console.log('post',data)
    return instance({
      url,
      data, //formdata形式传入
      method: 'post',
      transformRequest:[(data)=>{
          return JSON.stringify(data)
      }],
      processData: false,
      headers: { 'content-type':'application/x-www-form-urlencoded'}
    })
  }
}

export default http;
