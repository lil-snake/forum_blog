import {request} from "./request";

const requestUrl = '/userInfo';

export function getAuthorInfo(param){
    return request({
        url: requestUrl + "/inquire/" + param
    })
}

export function getAllUser(currentPage,size){
    return request({
        url: requestUrl + "/inquire/all/" + currentPage + "/" + size,
    })
}

export function updateUserInfo(params) {
    return request({
        url: requestUrl + '/updateUserInfo',
        method: 'post',
        data: params
    })
}

export function updatePhone(phoneNumber,code) {
    return request({
        url: requestUrl + '/update/phone',
        method: 'post',
        params: {
            phoneNumber: phoneNumber,
            code: code
        }
    })
}

export function updateEmail(email,code) {
    return request({
        url: requestUrl + '/update/email',
        method: 'post',
        params: {
            email: email,
            code: code
        }
    })
}

export function updateAvatar(avatarPath) {
    return request({
        url: requestUrl + '/update/avatar',
        method: 'post',
        params: {
            avatar: avatarPath
        }
    })
}

export function getBlogger(param){
    return request({
        url: requestUrl + "/blogger/" + param,
    })
}

export function deleteUser(param){
    return request({
        url: "/sysUsers" + "/deleted/" + param,
    })
}
