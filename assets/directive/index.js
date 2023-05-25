
import lazy from './picture/lazy'

const install = function(Vue) {
  Vue.directive('lazy', lazy)
}

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install
