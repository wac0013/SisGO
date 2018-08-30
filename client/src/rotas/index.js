// import Vue from 'vue';
import index from 'Telas/principal';
import login from 'Telas/login';

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
};
