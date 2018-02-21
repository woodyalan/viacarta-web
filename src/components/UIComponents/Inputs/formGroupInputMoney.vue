<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <money 
      class="form-control border-input"
      v-bind="money" 
      :disabled="disabled"
      :value="value"
      v-validate="rules" 
      :data-vv-as="label"
      @input="$emit('input', $event)">
    </money>
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  export default {
    inject: ['$validator'],
    name: 'fg-input-money',
    props: {
      label: String,
      name: String,
      disabled: Boolean,
      money: {
        type: Object,
        default: {
          decimal: ',', 
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false
        }        
      },
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
