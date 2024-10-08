import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

// headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Credentials": "true",
// },

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error); // Trả về một Promise bị reject để tiếp tục lan truyền lỗi
  }
);

export default axiosClient;
