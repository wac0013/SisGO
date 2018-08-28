<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input :placeholder="placeholder" :type="tipo">
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    label: String,
    inline: {
      type: Boolean,
      default: false
    },
    tipo: {
      validator: function(val) {
        return ['text', 'password', 'number'].indexOf(val) !== -1;
      }
    },
    habilitado: {
      Type: Boolean,
      default: false
    },
    tamanho: Number,
    fluid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      _habilitado: true
    };
  },
  created() {
    this._habilitado = this.habilitado;
    this._valor = '';
  },
  mounted() {
    let parent_form = false;
    let parent = this.$parent;

    while (parent != this.$parent.$parent || parent != this.$root) {
      parent_form = this.$el.nodeName == 'FORM';
      parent = parent.$parent;
    }
    if (!parent_form) {
      $(this.$el).addClass('ui input');
    } else {
      this.inline ? $(this.$el).addClass('inline field') : $(this.$el).addClass('field');
    }
    this._habilitado ? $(this.$el).addClass('disabled') : $(this.$el).removeClass('disabled');
    $(this.$el).setValue(this._valor);
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
