// request.ts
import axios from 'axios';

// 判断是否是 Electron 环境
const isElectron = navigator.userAgent.toLowerCase().includes('electron');

// 接口 1 的实例
export const files = axios.create({
  // 开发环境用代理前缀，Electron 环境直接写死 IP
  baseURL: isElectron ? 'http://192.168.50.251:3000' : '/file',
  // timeout: 5000,
});

// 接口 2 的实例
export const apis = axios.create({
  baseURL: isElectron ? 'http://192.168.50.251:9880' : '/api',
  // timeout: 5000,
});
// 接口 2 的实例
export const qwens = axios.create({
  baseURL: isElectron ? 'http://192.168.50.251:8000' : '/qwen',
  // timeout: 5000,
});