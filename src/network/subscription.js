import {request} from "./request";

const requestUrl = '/subscription';

export function checkSubscription(param) {
  return request({
    url: requestUrl + "/check/" + param
  })
}

export function subscription(param) {
  return request({
    url: requestUrl + "/subscribe/" + param
  })
}

export function unSubscription(param) {
  return request({
    url: requestUrl + "/unSubscribe/" + param
  })
}
