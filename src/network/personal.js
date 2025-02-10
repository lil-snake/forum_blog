import {request} from "./request";

const requestUrl = '/common';

export function getCaptchaCode(param) {
  return request({
    url: requestUrl + "/code/captcha?" + param
  })
}

export function getEmailCode(param) {
  return request({
    url: requestUrl + "/code/email/" + param
  })
}

export function register(params) {
  return request({
    url: requestUrl + '/registe',
    method: 'post',
    data: params
  })
}

export function login(params) {
  return request({
    url: requestUrl + '/login',
    method: 'post',
    data: params
  })
}


// localhost:8081/common/code/captcha