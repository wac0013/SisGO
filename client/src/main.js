import Vue from 'vue';
import principal from './screens/principal';
import rotas from './routes';
import 'styles/';

Vue.component('principal', principal);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  rotas,
  components: principal,
  template: '<principal/>'
});
