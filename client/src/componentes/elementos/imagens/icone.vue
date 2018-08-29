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
export default {
  name: 'vIcone',
  props: {
    cor: String
  }
};
</script>

<style scoped>
</style>
