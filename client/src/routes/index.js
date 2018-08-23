import Vue from 'vue';
import Router from 'vue-router';
import index from '../screens/principal.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    }
  ]
});
