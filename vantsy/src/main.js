import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import './mock'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9999/api/v1'
Vue.prototype.$http = axios

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
