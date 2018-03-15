<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <el-time-picker 
      v-bind="$props"
      :value="value"
      v-validate="rules" 
      :data-vv-as="label"
      @input="$emit('input', $event)">
    </el-time-picker>
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { TimePicker } from 'element-ui'

  Vue.use(TimePicker);

  export default {
    inject: ['$validator'],
    name: 'fg-timepicker',
    props: {
      label: String,
      name: String,
      placeholder: String,
      disabled: Boolean,
      value: [String, Date],
      valueFormat: {
        default: 'HH:mm'
      },
      format: {
        default: 'HH:mm'
      },
      rules: {
        type: Object,
        default: {}
      }
    }
  }

</script>
<style>

</style>
