<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <div class="clearfix"></div>
    <el-radio-group v-bind="$props" @input="$emit('input', $event)">
      <el-radio-button v-for="option in options" :key="option.value" :label="option.value">{{ option.text }}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { RadioGroup, RadioButton } from 'element-ui'
  
  Vue.use(RadioGroup);
  Vue.use(RadioButton);

  export default {
    inject: ['$validator'],
    name: 'fg-radio-button',
    props: {
      label: String,
      name: String,
      placeholder: String,
      disabled: Boolean,
      value: [String, Number],
      options: Array
    }
  }

</script>
<style>

</style>
