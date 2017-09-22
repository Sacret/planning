import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/Main';
import Planning from '@/pages/Planning';
import User from '@/pages/User';
import Results from '@/pages/Results';

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
    {
      path: '/user',
      component: User,
    },
    {
      path: '/results/:id',
      component: Results,
    },
  ],
});
