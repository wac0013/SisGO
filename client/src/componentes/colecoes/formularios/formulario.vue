<template>
  <form class="ui form">
    <slot>

    </slot>
  </form>
</template>

<script>
import { mixin } from 'Componentes/mixins';

export default {
  name: 'vForm',
  mixins: mixin,
  mounted() {
    this._valido = true;
  },
  methods: {
    defineEstado: function(estado) {
      switch (estado) {
        case 'VALIDO':
          break;
        case 'INVALIDO':
          break;
        default:
          break;
      }
    },
    defineErro: function() {},
    defineSucesso: function() {
      $(this.$el);
    }
  }
};
</script>
