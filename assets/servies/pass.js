import request from "../axios";

export function whiteProofs(data){
    return request('get', process.env.ENV.BASE_WHITE + '/v1/whiteProofs', data)
}
export function freeMintStatus(data){
    return request('get', process.env.ENV.BASE_WHITE + '/v1/freeMintStatus', data)
}
