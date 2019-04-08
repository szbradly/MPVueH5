// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './AppH5'
import router from './router'

Vue.config.productionTip = false

Vue.mixin({
  data () {
    return {
      service: '', // 服务
      router: '/'
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
