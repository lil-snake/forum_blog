import {request} from "./request";

const requestUrl = '/reportInfo';

export function submitReport(param) {
  return request({
    url: requestUrl + "/report",
    method: 'post',
    data: param
  })
}
