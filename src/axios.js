import axios from "axios";
import { API_BASE_URL } from "./shared/constants";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiGet = (url, config = {}) => {
  return instance.get(url, config);
};

const apiPost = (url, data, config = {}) => {
  return instance.post(url, data, config);
};

export { instance, apiGet, apiPost };
