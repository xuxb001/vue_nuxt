export default {
    development: {
        NODE_ENV: 'development',
        BASE_NEW_API: 'http://13.215.69.154:8891',
        BASE_API: 'http://13.215.69.154:8091',
        BASE_APPID: 1,
        BASE_CHAIN: 97,
        BASE_ACTIVITYID: 0
    },
    test: {
        NODE_ENV: 'sit',
        BASE_NEW_API: 'http://52.77.255.42:8891',
        BASE_API: 'http://13.215.69.154:8091',
        BASE_APPID: 3,
        BASE_CHAIN: 97,
        BASE_ACTIVITYID: 0
    },
    production: {
        NODE_ENV: 'production',
        BASE_NEW_API: 'https://archloot.com/api2',
        BASE_API: 'https://api.archloot.com/api',
        BASE_APPID: 1,
        BASE_CHAIN: 56,
        BASE_ACTIVITYID: 8
    }
}
