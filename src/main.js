import Vue from 'vue'
import App from './App.vue'
import {Input,Button,Message} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Input)
Vue.use(Button)
Vue.use(Message)

Vue.prototype.$message = Message

new Vue({
  render: h => h(App),
}).$mount('#app')
