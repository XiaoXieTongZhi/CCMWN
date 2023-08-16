import { baseUrl } from "@/utils/env";
import store from '@/store/index'
import axios from "axios";
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
// Add a request interceptor
service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    config.headers.Authorization='Bearer '+token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers;
    authorization && localStorage.setItem("token", authorization);
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status== 401||error.response.status== 402) {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        store.commit("changeModal")
      }
    }
    //直接false 走then但是不执行
    return Promise.reject(error);
  }
);
export default service;
