import {request} from "./request";

const requestUrl = '/likesRecord';

export function checkLike(articleId,authorId) {
  return request({
    url: requestUrl + "/checkLike",
    params: {
      articleId,
      authorId
    }
  })
}

export function releaseArticle(params) {
  return request({
    url: requestUrl + '/release',
    method: 'post',
    data: params
  })
}
