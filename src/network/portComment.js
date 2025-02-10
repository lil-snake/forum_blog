import {request} from "./request";

const requestUrl = '/portComment';

export function releasePrtComment(param) {
  return request({
    url: requestUrl + "/release",
    method: 'post',
    data: param
  })
}

export function getPrtComment(portId,curPage,size) {
  return request({
    url: requestUrl + "/query",
    method: 'get',
    params: {
      portId,
      curPage,
      size
    }
  })
}

export function deletePrtComment(id) {
  return request({
    url: requestUrl + "/delete/" + id,
  })
}

export function reportPrtComment(id) {
  return request({
    url: requestUrl + "/report/" + id,
  })
}
