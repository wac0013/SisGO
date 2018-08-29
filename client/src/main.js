import Vue from 'vue';
import principal from './telas/principal';
import rotas from './rotas';
import 'semantic-ui-less/semantic.less';
import { mixin } from 'Componentes/mixins';

Vue.component('principal', principal);
Vue.mixin(mixin);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  rotas,
  components: principal,
  template: '<principal/>'
});
