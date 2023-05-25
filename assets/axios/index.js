import axios from 'axios';
import {Message} from "element-ui";
axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});


axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.log(new Error(error));
    return {data: {}};
});

const request = (method, url, params) => {
    return new Promise((resolve, reject) => {
        if (params) {
            for (const field of Object.keys(params)) {
                if (params[field] === '' || params[field] === null) {
                    delete params[field];
                }
            }
        }
        if (method.toLowerCase() === 'get' && params) {
            let _data = '';
            for (let key in params) {
                _data += (_data ? ('&' + key + '=' + params[key]) : (key + '=' + params[key]));
            }
            url = url + '?' + _data;
        }
        axios({
            method,
            url,
            data: params,
            headers: {
                ContentType: 'application/json',
            }
        }).then(res => {
            if (res) {
                resolve(res);
                if (res.code && res.code !== 0 && res.code !== 200) {
                    Message.error({
                        type: 'success',
                        message: res.msg,
                        customClass: '__message',
                        duration: 3000,
                        offset: 100,
                        showClose: true,
                    })
                }
            }
        }).catch(err => {
            reject(err);
        });
    });
};
export default request;
