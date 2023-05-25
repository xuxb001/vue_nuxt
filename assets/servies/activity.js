import request from "../axios";

export function activityInfo(data){
    return request('get', process.env.ENV.BASE_API + '/activityInfo/get', data)
}
