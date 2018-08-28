<template>
  <div :class="this.classes('ui')">
    <label v-if="label">{{label}}</label>
    <input v-if="tipo !== 'textaera'" :placeholder="placeholder" :type="tipo">
    <textarea v-else/>
  </div>
</template>

<script>
import { mixin } from 'Componentes/mixins';
import { icone } from 'Elementos/imagens/icone';

export default {
  name: 'vEdit',
  mixins: mixin,
  props: {
    placeholder: String,
    label: String,
    inline: {
      type: Boolean,
      default: false
    },
    tipo: {
      validator: function(val) {
        return ['text', 'password', 'number', 'textarea'].indexOf(val) !== -1;
      }
    },
    habilitado: {
      Type: Boolean,
      default: false
    },
    tamanho: Number,
    fluid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      _habilitado: true
    };
  },
  created() {
    this._habilitado = this.habilitado;
    this._valor = '';
  },
  mounted() {
    let parent_form = false;
    let parent = this.$parent;

    while (parent != this.$parent.$parent || parent != this.$root) {
      if (parent.$el.nodeName == 'FORM') {
        parent_form = true;
        break;
      } else {
        parent = parent.$parent;
      }
    }
    if (!parent_form) {
      $(this.$el).addClass('ui input');
    } else {
      this.inline ? $(this.$el).addClass('inline field') : $(this.$el).addClass('field');
    }
    this._habilitado ? $(this.$el).addClass('disabled') : $(this.$el).removeClass('disabled');
  },
  methods: {
    desabilitar() {
      this._habilitado = false;
    },
    habilitar() {
      this._habilitado = true;
    }
  }
};
</script>

<style scoped>
</style>
