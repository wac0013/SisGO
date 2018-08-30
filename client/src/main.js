import Vue from 'vue';
import VueRouter from 'vue-router';
import principal from './telas/principal';
import rotas from './rotas';
import 'semantic-ui-less/semantic.less';
import { mixin } from 'Componentes/mixins';

var router = new VueRouter(rotas);

Vue.use(VueRouter);
Vue.component('principal', principal);
Vue.mixin(mixin);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: principal,
  template: '<principal/>'
});
