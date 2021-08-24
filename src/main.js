import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';

import router from './router';
import store from './store';

// directives
import pinDirective from './shared/pin-directive';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.directive('pin', pinDirective);

Vue.use(BootstrapVue);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
