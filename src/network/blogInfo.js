import {request} from "./request";

const requestUrl = '/blogInfo';

export function getBlogInfo(param) {
    return request({
        url: requestUrl + "/blogInfo/" + param
    })
}

export function likeBlog(param) {
    return request({
        url: requestUrl + "/likeBlog/" + param
    })
}

export function unLikeBlog(param) {
    return request({
        url: requestUrl + "/unLikeBlog/" + param
    })
}


