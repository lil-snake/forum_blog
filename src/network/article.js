import {request} from "./request";

const requestUrl = '/article';

export function deleteDetail(param) {
    return request({
        url: requestUrl + "/delete/" + param
    })
}

export function articleDetail(param) {
    return request({
        url: requestUrl + "/detail/" + param
    })
}


export function updateArticle(params) {
    return request({
        url: requestUrl + '/update',
        method: 'post',
        data: params
    })
}

export function releaseArticle(params) {
    return request({
        url: requestUrl + '/release',
        method: 'post',
        data: params
    })
}

export function getPopular(param) {
    return request({
        url: requestUrl + '/popular/' + param,
    })
}

export function getRecent() {
    return request({
        url: requestUrl + "/recent"
    })
}

export function getSearchBlog(keyword,currentPage,size){
    return request({
        url: requestUrl + "/search/" + keyword +"/" + currentPage + "/" + size
    })
}

export function getPopularPaging(currentPage,size){
    return request({
        url: requestUrl + "/popular/paging",
        params: {
            curPage: currentPage,
            size: size
        }
    })
}

export function getLatestPosts(currentPage, size) {
    return request({
        url: requestUrl + "/latestPosts/" + currentPage + "/" + size,
    })
}

export function getMostCollection(currentPage, size) {
    return request({
        url: requestUrl + "/mostCollection/" + currentPage + "/" + size,
    })
}

export function getPersonalArticle(currentPage, size, authorId) {
    return request({
        url: requestUrl + "/personal/" + currentPage + "/" + size + "/" + authorId,
    })
}

export function getMostPageViews(currentPage, size) {
    return request({
        url: requestUrl + "/mostPageViews/" + currentPage + "/" + size,
    })
}

export function getList(type,currentPage, size) {
    return request({
        url: requestUrl + "/list/"+ type + "/" + currentPage + "/" + size,
    })
}
