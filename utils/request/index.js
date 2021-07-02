import axios from 'axios';
// import { Message } from 'element-ui';
// import { getToken, setToken } from '@/utils/cookie';
import qs from 'qs';
// import store from '@/store';

const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true // 跨域允许携带cookie
});

request.interceptors.request.use((config) => {
  // if (getToken()) {
  //   config.headers['x-token'] = getToken();
  // }
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, err => Promise.reject(err));

request.interceptors.response.use((response) => {
  // if (response.data.token) {
  //   setToken(response.data.token);
  // }

  if (response.data.code === 200) {
    return Promise.resolve(response.data);
  }

  if (response.data.code === 401) {
    // 退出登录
    // store.dispatch('logout');
    return;
  }

  // Message.error({
  //   showClose: true,
  //   message: response.data.msg || `Error:${response.request.url}`
  // });
  return Promise.reject(response);
}, (error) => {
  // Message.error({
  //   showClose: true,
  //   message: error.msg
  // });
  return Promise.reject(error);
});

export default request;