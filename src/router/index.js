import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Planning from '@/components/Planning';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main page',
      component: Main,
    },
    {
      path: '/plannings/:id',
      component: Planning,
    },
  ],
});
