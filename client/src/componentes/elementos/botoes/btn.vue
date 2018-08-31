<template>
  <div v-if="label" :class="this.classes(
    'ui',
    'button'
  )">

  </div>
  <button v-else :class="this.classes(
    'ui',
    'button'
  )"/>
</template>

<script>
export default {
  props: {
    label: String
  }
};
</script>
