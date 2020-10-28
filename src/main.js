import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 创建事件总线，另$bus是一个vue实例，这样他就可以使用$emit和$on来发射事件和接收事件了
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
