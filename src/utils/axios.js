import { baseUrl } from "@/utils/env";

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
    if (error.status== 401||error.status== 402) {
      localStorage.removeItem('token')
      this.$store.commit("changeModal");
    }
    //直接false 走then但是不执行
    return false;
  }
);
export default service;
