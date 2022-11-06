import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import RequestType from '@/typings/request';

class Axios {
  // axios 实例
  instance: AxiosInstance;

  // 拦截器对象
  interceptorsObj?: RequestType.RequestInterceptors;

  constructor(config: RequestType.RequestConfig) {
    // axios 实例
    this.instance = axios.create(config);
    // 拦截器对象
    this.interceptorsObj = config.interceptors;

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => res,
      (err: any) => err,
    );

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );

    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (err: any) => {
        console.log(err.response.data.message);
        return err.response.data;
      },
    );
  }

  request<T>(config: RequestType.RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<unknown, T>(config)
        .then((res: T) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch((err: unknown) => {
          reject(err);
        });
    });
  }
}

export default Axios;
