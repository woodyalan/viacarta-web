<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <textarea class="form-control border-input" v-bind="$props" :value="value"
           @input="$emit('input',$event.target.value)" v-validate="rules" :data-vv-as="label"></textarea>
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  export default {
    inject: ['$validator'],
    name: 'fg-textarea',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      rows: {
        type: Number,
        default: 5
      },
      label: String,
      name: String,
      disabled: Boolean,
      placeholder: String,
      readonly: Boolean,
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
