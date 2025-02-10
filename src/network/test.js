import {request} from "./request";

export function test() {
  return request({
    url: "/test"
  })
}
