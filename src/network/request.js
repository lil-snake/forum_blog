import axios from 'axios'
import {base_url} from "../common/common_variable";
import { MessageBox, Message, Notification } from 'element-ui';
// import store from '@/store';
import router from '../router/router';
import {getCookie,setCookie,setCookieAuthorId,
  getCookieAuthorId, getCookieAvatarPath, setCookieAvatarPath,
  getCookieNickName, setCookieNickName} from "common/cookieUtils";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://localhost:8081',
    baseURL: base_url,
    timeout: 60000
  });

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // 如果有token,携带token
    let token = getCookie();
    if(token){
      config.headers.common['Authorization'] = token;
    }

    return config
  }, err => {
    // console.log(err);
  });

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    if(res.headers['refresh-token']) {// token续约！
      setCookie(res.headers['authorization']);
      setCookieAuthorId(getCookieAuthorId());
      setCookieAvatarPath(getCookieAvatarPath());
      setCookieNickName(getCookieNickName());
      console.log("token续约");
    }
    if (res.data.status == 4003){
      Notification({
        title: '警告',
        message: res.data.msg,
        type: 'warning'
      });
    }
    if (res.data.status == 4001){
      Notification({
        title: '警告',
        message: res.data.msg + ", 请重新登录",
        type: 'warning'
      });
      router.push('/login');
      return ;
    }
    return res.data
  }, err => {
    console.log(err);
  });

  // 3.发送真正的网络请求
  return instance(config)
}
