import Vue from 'vue'
import css from 'swiper/css/swiper.css' // 注意css路径
import VueAwesomeSwiper from 'vue-awesome-swiper'

export default () => {
    Vue.use(VueAwesomeSwiper, {css})
}
