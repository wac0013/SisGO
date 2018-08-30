<template>
  <div :class="
    this.classes(
      'ui',
      this.icone && 'icon',
      !this.parent_form && 'input',
      this.parent_form && this.inline && 'inline',
      this.obrigatorio && 'required',
      this.parent_form && 'field',
      !this._habilitado && 'disabled'
    )"
  >
    <label v-if="label && this.parent_form">{{label}}</label>
    <input v-if="tipo !== 'textaera'" :placeholder="placeholder" :type="tipo">
    <textarea v-else :rows="linhas"/>
    <v-icone v-if="icone"/>
  </div>
</template>

<script>
import { icone } from 'Elementos/imagens/icone';
import { Enum } from '../../bib/constantes.js';

export default {
  name: 'vEdit',
  components: {
    'v-icone': () => import('Colecoes/forms/form') //async import
  },
  props: {
    placeholder: String,
    label: String,
    inline: {
      type: Boolean,
      default: false
    },
    tipo: Enum.Input(),
    habilitado: {
      Type: Boolean,
      default: true
    },
    tamanho: Number,
    fluido: {
      type: Boolean,
      default: false
    },
    obrigatorio: {
      type: Boolean,
      default: false
    },
    linhas: {
      type: Number,
      default: 5
    },
    icone: String,
    posicao_icone: String
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
