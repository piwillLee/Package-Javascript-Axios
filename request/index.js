import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class MYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    this.instance.interceptors.request.use(
      (config) => {
        // 网络请求 拦截
        // 设置 loading 动画
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 网络响应 拦截
        // 取消 loading 动画
        return res;
      },
      (err) => {
        // 取消 loading 动画
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }
  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

export const myReq = new MYRequest(BASE_URL, TIMEOUT);
