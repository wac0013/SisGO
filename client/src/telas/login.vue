<template>
  <div>
    <h1>Bem vindo</h1>
    <sui-card>
      <sui-card-content>
        <sui-form>
          <sui-form-field>
            <label>Email ou CPF</label>
            <input placeholder="Email ou CPF" >
            <sui-label v-if="show_label_usuario" pointing>Please enter a value</sui-label>
          </sui-form-field>
          <sui-form-field>
            <label>Senha</label>
            <input placeholder="Senha" >
            <sui-label v-if="show_label_senha" pointing>Please enter a value</sui-label>
          </sui-form-field>
          <sui-button primary>Login</sui-button>
        </sui-form>
      </sui-card-content>
    </sui-card>
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
    return {
      show_label_senha: false,
      show_label_usuario: false
    };
  },
  computed: {
    tipos_input: function() {
      return tipos_input;
    }
  }
};
</script>

