<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <el-date-picker 
      type='datetime'
      v-bind="$props"
      :value="value"
      v-validate="rules" 
      :data-vv-as="label"
      @input="$emit('input', $event)">
    </el-date-picker>
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  export default {
    inject: ['$validator'],
    name: 'fg-datetimepicker',
    props: {
      label: String,
      name: String,
      placeholder: String,
      disabled: Boolean,
      value: [String],
      valueFormat: {
        default: 'yyyy-MM-dd HH:mm'
      },
      format: {
        default: 'dd/MM/yyyy HH:mm'
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
