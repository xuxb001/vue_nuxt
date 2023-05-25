import request from "../axios";

export function subScribeEmail(data) {
    return request(
        'post',
        process.env.ENV.BASE_API+'/subscribe/email',
         data,

    );
}
