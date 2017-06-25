// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueFire from 'vuefire';
import VueSocialSharing from 'vue-social-sharing';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueFire);
Vue.use(VueSocialSharing);

Vue.filter('capitalize', (value) => {
  if (!value) return '';
  const newValue = value.toString();
  return newValue.charAt(0).toUpperCase() + newValue.slice(1);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
