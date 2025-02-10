import {request} from "./request";

const requestUrl = '/imageBase64';

export function test() {
    return request({
        url: ""
    })
}

export function uploadBase64(params){
    return request({
        url: requestUrl+'/upload/image-base64',
        method: 'post',
        data: params
    })
}
