<template>
  <i :class="this.classes(
    this.cor,
    this.nome,
    this.tamanho,
    this.carregando && 'loading',
    this.desabilitado && 'disabled',
    'icon'
  )">
  </i>
</template>

<script>
import { mixin } from 'Componentes/mixins';

  export default {
    name: 'vIcone',
    mixins: mixin,
    props: {
      cor: Enum.Color()
    }
  }
</script>

<style scoped>

</style>
