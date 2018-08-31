<template>
  <div>
    <h1>Bem vindo</h1>
    <v-form>
      <v-input label="email ou nome de usuário" :tipo="tipos_input.TEXTO"></v-input>
      <v-input label="senha" :tipo="tipos_input.SENHA"></v-input>
      <v-btn></v-btn>
    </v-form>
  </div>
</template>

<script>
import Input from 'Elementos/inputs/input';
import Btn from 'Elementos/botoes/btn';
import { tipos_input } from '../componentes/bib/constantes';

export default {
  components: {
    'v-input': Input,
    'v-btn': Btn,
    'v-form': () => import('Colecoes/forms/form') //async import
  },
  data() {
    return {};
  },
  computed: {
    tipos_input: function() {
      return tipos_input;
    }
  }
};
</script>

