import axios from 'axios';

// 创建 axios 实例
// request.ts
const request = axios.create({
    // 确保 baseURL 是被删除或注释掉的
    timeout: 5000,
  });

// 请求拦截器
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

// 响应拦截器
request.interceptors.response.use(response => {
  // 可统一处理返回结构，如 code !== 200 抛错
  if (response.data.code !== 200) {
    return Promise.reject(response.data.message || '接口请求失败');
  }
  return response.data.data; // 返回 data 字段，简化业务层逻辑
}, error => {
  console.error('请求出错', error);
  return Promise.reject(error);
});

export default request;