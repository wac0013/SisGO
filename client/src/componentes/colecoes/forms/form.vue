<template>
  <form :class="
    this.classes(
      'ui',
      this.status,
      this.campos_mesma_largura && 'equal width',
      this.cor_invertido && 'inverted',
      'form'
    )"
  >
    <slot>

    </slot>
  </form>
</template>

<script>
import { Enum, status } from '../../bib/constantes';

export default {
  props: {
    estado: Enum.Status(),
    tamanho: Enum.Tamanho(),
    campos_mesma_largura: {
      type: Boolean,
      default: false
    },
    cor_invertido: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: this.estado
    };
  },
  methods: {
    defineErro: function() {
      this._estado = status.ERRO;
    },
    defineSucesso: function() {
      this._estado = status.SUCESSO;
    }
  }
};
</script>
