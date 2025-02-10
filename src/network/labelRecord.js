import {request} from "./request";

const requestUrl = '/labelRecord';

export function getQuery(currentPage,size) {
    return request({
        url: requestUrl + "/query",
        params: {
            currentPage,
            size
        }
    })
}