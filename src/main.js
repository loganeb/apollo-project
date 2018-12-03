import Vue from 'vue'
import App from './App.vue'
import vgl from 'vue-golden-layout'
import 'golden-layout/src/css/goldenlayout-dark-theme.css'

Vue.use(vgl);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

