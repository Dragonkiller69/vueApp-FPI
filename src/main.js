import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap'
import Notifications from 'vue-notification'
 
Vue.use(Vuetify)
Vue.use(Notifications)
Vue.config.productionTip = false

Vue.notify({
  group: 'foo',
  title: 'Important message',
  text: 'Hello user! This is a notification!'
})

new Vue({
  render: h => h(App),
}).$mount('#app')

