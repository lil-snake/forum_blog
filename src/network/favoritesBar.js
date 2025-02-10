import {request} from "./request";

const requestUrl = '/favoritesBar';

export function create(param) {
  return request({
    url: requestUrl + "/create",
    method: 'post',
    data: param
  })
}

export function update(param) {
  return request({
    url: requestUrl + "/update",
    method: 'post',
    data: param
  })
}

export function deleteFavoritesBar(id) {
  return request({
    url: requestUrl + "/delete/" + id,
  })
}

export function query(authorId) {
  return request({
    url: requestUrl + "/query/" + authorId
  })
}
