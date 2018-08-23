'use strict';
import promise from 'es6-promise'
import axios from 'axios';
import qs from 'qs';

promise.polyfill();

// 全局配置
axios.defaults.baseURL = process.env.baseUrl;

// 请求前
axios.interceptors.request.use(config => {
<<<<<<< HEAD
    config.timeout = '10000';
=======
    // config.timeout = '10000';
    // 修改请求时长为30000 李艳品 8.14
    config.timeout = '30000';
>>>>>>> 8.14
    // let pathName = ['/', '/account/login', '/account/login/', '/account/forgetPassword', '/account/forgetPassword/', '/account/register', '/account/register/', '/account/receive', '/account/receive/', '/account/richText/', '/account/richText'] // 不需要登录的页面
    // if (pathName.indexOf(location.pathname) === -1 && localStorage.tokenTg === undefined) {
    //     location.href = '/account/login'
    //     return false;
    // }
    // 用于实现URL参数字符串与参数对象的互相转换
    if (config.method === 'post') {
        let params = config.data || {}
        if (localStorage.tokenTg) {
            params['token'] = localStorage.tokenTg;
        }
        config.data = qs.stringify(params);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(data => {
    if (data.data.code === 1002) {
        // console.log(data.data)
        localStorage.removeItem('tokenTg')
        localStorage.removeItem('head_pic')
        localStorage.removeItem('nickname')
        location.href = '/account/login'
    }

    return data;
}, error => {
    return Promise.reject(error)
})

export default axios

// export const getCookie = function() {
//     var name = 'token='
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i].trim();
//         if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
//     }
//     return '';
// }
