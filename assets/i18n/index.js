// export default i18n
import en from './langs/en.js';
import ja from './langs/ja.js';
const i18n = {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    vueI18n: {
        fallbackLocale: 'en',
        messages: {
            en: en,
            ja: ja
        }
    }
}
export default i18n
