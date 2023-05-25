import request from "../axios/index.js";

export function tokens(val){
    return request('get', process.env.ENV.BASE_NEW_API + '/v1/tokens', {
        "address": val,
    })
}
export function bnftTokens(val){
    return request('get', process.env.ENV.BASE_NEW_API + '/v1/bnftTokens', {
        "address": val,
    })
}
export function reveal(data){
    return request('get', process.env.ENV.BASE_NEW_API + '/v1/reveal', data)
}
export function status(data){
    return request('get', process.env.ENV.BASE_NEW_API + '/v1/status', data)
}
export function getTime(data){
    return request('get', process.env.ENV.BASE_API + '/time/getTime', data)
}
