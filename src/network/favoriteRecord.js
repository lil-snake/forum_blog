import {request} from "./request";

const requestUrl = '/favoriteRecord';

export function query(authorId,favoritesId) {
  return request({
    url: requestUrl + "/query",
    method: 'get',
    params: {
      authorId,
      favoritesId
    }
  })
}

export function collect(param) {
  return request({
    url: requestUrl + "/collect",
    method: 'post',
    data: param
  })
}

export function unCollect(id) {
  return request({
    url: requestUrl + "/unCollect/" + id
  })
}

export function check(articleId) {
  return request({
    url: requestUrl + "/check/" + articleId
  })
}
