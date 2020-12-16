import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入样式文件
import './assets/css/global.css'
// 引入阿里图标
import './assets/fonts/iconfont.css'
//axios
import axios from 'axios'
//接口基准地址
axios.defaults.baseURL = 'http://www.tangxiaoyang.vip:8888/api/v2/'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
