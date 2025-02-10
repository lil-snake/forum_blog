import {request} from "./request";

const requestUrl = '/postInfo';

export function releasePostInfo(param) {
  return request({
    url: requestUrl + "/release",
    method: 'post',
    data: param
  })
}

export function query(curPage, size, keywords) {
  return request({
    url: requestUrl + "/query",
    method: 'get',
    params: {
      curPage,
      size,
      keywords
    }
  })
}

export function getPostInfo(postId) {
  return request({
    url: requestUrl + "/get",
    method: 'get',
    params: {
      postId
    }
  })
}

export function getPersonal(curPage, size, authorId) {
  return request({
    url: requestUrl + "/personal",
    method: 'get',
    params: {
      curPage,
      size,
      authorId
    }
  })
}
