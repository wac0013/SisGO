<template>
  <i :class="this.classes(
    this.cor,
    this.nome,
    this.tamanho,
    this.carregando && 'loading',
    this.desabilitado && 'disabled',
    this.link && 'link',
    'icon'
  )">
  </i>
</template>

<script>
export default {
  name: 'vIcone',
  props: {
    nome: {
      type: String,
      required: true
    },
    cor: String,
    link: Boolean,
    virado: Boolean,
    girado: Boolean
  }
};
</script>
