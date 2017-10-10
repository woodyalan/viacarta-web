<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <input class="form-control border-input" v-bind="$props" :value="value"
           @input="$emit('input',$event.target.value)" v-validate="rules" :data-vv-as="label">
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  export default {
    name: 'fg-input',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      label: String,
      name: String,
      disabled: Boolean,
      placeholder: String,
      value: [String, Number],
      rules: {
        type: Object,
        default: {}
      }
    }
  }

</script>
<style>

</style>
