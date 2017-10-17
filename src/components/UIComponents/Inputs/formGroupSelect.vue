<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <select class="form-control border-input" v-bind="$props" :value="value"
           @input="$emit('input',$event.target.value)" v-validate="rules" :data-vv-as="label">
      <option value="">Selecione</option>
      <option v-for="(option, index) in options" :value="option.value">{{ option.text}}</option>
    </select>
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  export default {
    inject: ['$validator'],
    name: 'fg-select',
    props: {
      label: String,
      name: String,
      disabled: Boolean,
      value: [String, Number],
      options: Array,
      rules: {
        type: Object,
        default: {}
      }
    }
  }

</script>
<style>

</style>
