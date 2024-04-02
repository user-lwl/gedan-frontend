import axios from 'axios';

// 创建一个 axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://gedan-backend.douyoubanfan.icu/api', // 设置你的自定义 baseURL
});

export default axiosInstance;