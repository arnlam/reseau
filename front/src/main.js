import '@babel/polyfill'
import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;
let userId = localStorage.getItem('user-id');

router.beforeEach((to, from, next) => { 
  if(to.path == '/') {
    if (!userId) { 
      next({ path: '/login'}) 
    } else { 
      next() 
    } 
  } else {
    next()
  }
}) 


new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App),
  data: {
    userId
  }
}).$mount('#app');
