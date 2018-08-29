<template>
  <div>
    <h1>Bem vindo</h1>
    <v-form>
      <v-edit label="teste" tipo="teste"></v-edit>
    </v-form>
  </div>
</template>

<script>
import vEdit from 'Elementos/edits/edit';
import vForm from 'Colecoes/formularios/formulario';

export default {
  components: {
    vEdit,
    vForm
  }
};
</script>
