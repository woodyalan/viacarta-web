<template>
  <div class="form-group">
    <label v-if="label">{{label}}</label>
    <input
      class="form-control border-input"
      v-bind="$props"
      :value="value"
      @input="$emit('input',$event.target.value)"
      @blur="$emit('blur',$event.target.value)"
      v-validate="rules"
      :data-vv-as="label"
      v-mask="mask"
    >
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
export default {
  inject: ["$validator"],
  name: "fg-input-mask",
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String,
    name: String,
    disabled: Boolean,
    placeholder: String,
    mask: [String, Array],
    value: [String, Number, Date],
    rules: {
      type: Object,
      default: {}
    }
  }
};
</script>
<style>
</style>
