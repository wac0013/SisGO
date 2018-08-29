<template>
  <div :class="
    this.classes(
      'ui',
      !this.parent_form && 'input',
      this.parent_form && this.inline && 'inline',
      this.parent_form && 'field',
      !this._habilitado && 'disabled'
    )"
  >
    <label v-if="label && this.parent_form">{{label}}</label>
    <input v-if="tipo !== 'textaera'" :placeholder="placeholder" :type="tipo">
    <textarea v-else/>
  </div>
</template>

<script>
import { icone } from 'Elementos/imagens/icone';
import { Enum } from '../../bib/constantes.js';

export const tipos = {
  TEXTO: 'text',
  SENHA: 'password',
  NUMERO: 'number',
  AREA_TEXTO: 'textarea'
};

function validaTipos(val) {
  return Object.getOwnPropertyNames(tipos).indexOf(val);
}

export default {
  name: 'vEdit',
  props: {
    placeholder: String,
    label: String,
    inline: {
      type: Boolean,
      default: false
    },
    tipo: Enum.Social(),
    habilitado: {
      Type: Boolean,
      default: true
    },
    tamanho: Number,
    fluid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      _habilitado: true,
      _show_label: false,
      parent_form: false
    };
  },
  created() {
    this._habilitado = this.habilitado;
    this._valor = '';
  },
  beforeCreate() {},
  mounted() {
    let parent = this.$parent;

    while (parent != this.$parent.$parent || parent != this.$root) {
      if (parent.$el.nodeName == 'FORM') {
        this.parent_form = true;
        break;
      } else {
        parent = parent.$parent;
      }
    }
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
