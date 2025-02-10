import {request} from "./request";

const requestUrl = '/articleComment';

export function showComment(param) {
  return request({
    url: requestUrl + "/show/" + param
  })
}

export function publishComment(params) {
  return request({
    url: requestUrl + '/publish',
    method: 'post',
    data: params
  })
}

export function deleteComment(param) {
  return request({
    url: requestUrl + "/delete/" + param
  })
}
