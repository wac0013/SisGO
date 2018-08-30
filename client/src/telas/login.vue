<template>
  <div>
    <h1>Bem vindo</h1>
    <v-form>
      <v-input label="teste" tipo="text"></v-input>
    </v-form>
  </div>
</template>

<script>
import Input from 'Elementos/inputs/input';

export default {
  components: {
    'v-input': Input,
    'v-form': () => import('Colecoes/forms/form') //async import
  }
};
</script>

