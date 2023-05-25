import i18n  from "./assets/i18n/index.js"
const description = 'UGC-NFT game. The 1st interactive NFT gameplay that frees your imagination.';
export default {
    target: 'static',
    env: {
        ENV: {
            development: {
                NODE_ENV: 'development',
                BASE_NEW_API: 'https://archloot.dev.connector.games/api2',
                BASE_API: 'https://archloot.dev.connector.games/api1',
                BASE_APPID: 1,
                BASE_CHAIN: 97,
                BASE_ACTIVITYID: 0,
                BASE_DASHBORAD: 'https://dashboard.dev.connector.games',
                BASE_DASHBORADMARAKET: 'https://dashboard.dev.connector.games/market',
                BASE_WHITE: 'http://34.81.246.151:8893'
            },
            test: {
                NODE_ENV: 'test',
                BASE_NEW_API: 'https://archloot.test.connector.games/api2',
                BASE_API: 'https://archloot.test.connector.games/api1',
                BASE_APPID: 3,
                BASE_CHAIN: 97,
                BASE_ACTIVITYID: 0,
                BASE_DASHBORAD: 'https://dashboard.test.connector.games',
                BASE_DASHBORADMARAKET: 'https://dashboard.test.connector.games/market',
                BASE_WHITE: 'https://archloot.test.connector.games/api3'
            },
            production: {
                NODE_ENV: 'production',
                BASE_NEW_API: 'https://archloot.com/mef',
                BASE_API: 'https://archloot.com/webs',
                BASE_APPID: 1,
                BASE_CHAIN: 56,
                BASE_ACTIVITYID: 8,
                BASE_DASHBORAD: 'https://dashboard.archloot.com',
                BASE_DASHBORADMARAKET: 'https://dashboard.archloot.com/market',
                BASE_WHITE: 'https://archloot.com/passmint'
            }
        }[process.env.NODE_ENV]
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Archloot',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'},
            {hid: 'description', name: 'description', content: description},
            {name: 'format-detection', content: 'telephone=no'},
            {name: 'robots', content: 'index,follow'},
            {'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate'},
            {'http-equiv': 'Cache', content: 'no-cache'},
            {'http-equiv': 'Pragma', content: 'no-cache'},
            {'http-equiv': 'Expires', content: '0'},
            {
                name: 'KEYWords',
                contect: 'listed on Bithumb Gamefi 2.0 Archloot Beta Top Web3 games, Kryptos GameFi, DeFi, SocialFi, Web3, Games'
            },
            {name: 'google-site-verification', content: 'LnM6jzrrnObHpoqCSONdu_MfyjUOIIvb06NcRpAxyhk'},
            {property: 'url', content: 'https://www.archloot.com'},
            {property: 'type', content: 'article'},
            {property: 'title', content: 'Archloot'},
            {property: 'description', content: description},
            {property: 'image', content: 'https://archloot.com/static/images/prod/content/archloot.png?t=32243'},
            {itemprop: 'image', content: 'https://archloot.com/static/images/prod/content/archloot.png?t=32243'},


            {property: 'og:url', content: 'https://www.archloot.com'},
            {property: 'og:type', content: 'article'},
            {property: 'og:site_name', content: 'Archloot'},
            {property: 'og:title', content: 'Archloot'},
            {property: 'og:description', content: description},
            {property: 'og:image', content: 'https://archloot.com/static/images/prod/content/archloot.png?t=32243'},


            {property: 'twitter:url', content: 'https://www.archloot.com'},
            {property: 'twitter:type', content: 'article'},
            {property: 'twitter:title', content: 'Archloot'},
            {property: 'twitter:card', content: 'summary_large_image'},
            {property: 'twitter:description', content: description},
            {property: 'twitter:image', content: 'https://archloot.com/static/images/prod/content/archloot.png?t=32243'},
            {property: 'twitter:image:src', content: 'https://archloot.com/static/images/prod/content/archloot.png?t=32243'},
            {property: 'al:url', content: 'https://www.archloot.com'},
            {property: 'al:type', content: 'article'},
            {property: 'al:title', content: 'Archloot'},
            {property: 'al:description', content: description},
            {property: 'al:image', content: 'https://archloot.com/static/images/prod/content/archloot.png?t=32243'},

        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ],
        script: [
            {src: '/js/jquery-1.8.3.min.js', type: 'text/javascript', ssr: false,},
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'animate.css/animate.css',
        '~/assets/css/index.scss',
        'element-ui/lib/locale/lang/en',
        'element-ui/lib/locale/lang/ja'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/element-ui',
        {src: '@/assets/js/sdk/init.wallet.js', ssr: false},
        {src: '@/assets/js/sdk/init-api.js', ssr: false},
        {src: '@/assets/js/session.js', ssr: false},
        {src: '@/store/index.js', ssr: false},
        {src: "@/plugins/swiper.js", ssr: false},
        {src: '@/plugins/store.js', ssr: false},
        {src: '@/plugins/clipboard2', ssr: false}
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxt/postcss8'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/i18n'
    ],
    i18n: i18n,
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
    }
}
