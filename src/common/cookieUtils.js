import Cookies from 'js-cookie'

import {COOKIE_KEY,COOKIE_EXPIRES,COOKIE_AUTHORID_KEY,COOKIE_AVATAR_PATH,COOKIE_NICKNAME_PATH} from "./common_variable";

// cookie
export function getCookie() {
    return Cookies.get(COOKIE_KEY)
}

export function setCookie(token) {
    let inFifteenMinutes = new Date(new Date().getTime() + COOKIE_EXPIRES);
    return Cookies.set(COOKIE_KEY, token,{expires: inFifteenMinutes})
}

export function removeCookie() {
    return Cookies.remove(COOKIE_KEY)
}

// authorId
export function getCookieAuthorId() {
    return Cookies.get(COOKIE_AUTHORID_KEY)
}

export function setCookieAuthorId(authorId) {
    let inFifteenMinutes = new Date(new Date().getTime() + COOKIE_EXPIRES);
    return Cookies.set(COOKIE_AUTHORID_KEY, authorId,{expires: inFifteenMinutes})
}

export function removeCookieAuthorId() {
    return Cookies.remove(COOKIE_AUTHORID_KEY)
}

// avatar
export function getCookieAvatarPath() {
    if(Cookies.get(COOKIE_AVATAR_PATH) === 'http://image.fangweb.top/FrRjWN9otxPaDS791RS_iUUrPhTE') {
        return 'https://img2.baidu.com/it/u=2852771508,1782961552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    }
    return Cookies.get(COOKIE_AVATAR_PATH)
}

export function setCookieAvatarPath(path) {
    let inFifteenMinutes = new Date(new Date().getTime() + COOKIE_EXPIRES);
    return Cookies.set(COOKIE_AVATAR_PATH, path, {expires: inFifteenMinutes})
}

export function removeCookieAvatarPath() {
    return Cookies.remove(COOKIE_AVATAR_PATH)
}

// nickName
export function getCookieNickName() {
    return Cookies.get(COOKIE_NICKNAME_PATH)
}

export function setCookieNickName(path) {
    let inFifteenMinutes = new Date(new Date().getTime() + COOKIE_EXPIRES);
    return Cookies.set(COOKIE_NICKNAME_PATH, path, {expires: inFifteenMinutes})
}

export function removeCookieNickName() {
    return Cookies.remove(COOKIE_NICKNAME_PATH)
}
