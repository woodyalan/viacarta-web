<template>
  <div class="form-group">
    <label v-if="label">{{label}}</label>
    <select
      class="form-control border-input"
      v-bind="$props"
      :value="value"
      @input="$emit('input',$event.target.value), selectObject($event.target.value)"
      v-validate="rules"
      :data-vv-as="label"
    >
      <option value>Selecione</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text}}</option>
    </select>
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
export default {
  inject: ["$validator"],
  name: "fg-select",
  props: {
    label: String,
    name: String,
    disabled: Boolean,
    multiple: Boolean,
    value: [String, Number, Boolean],
    options: Array,
    rules: {
      type: Object,
      default: {}
    }
  },
  methods: {
    selectObject(value) {
      if (value) {
        let val = this.options.filter(function(o) {
          if (o.value == value) {
            return o;
          }
        });

        this.$emit("selectedObject", val[0]);
      }
    }
  }
};
</script>
<style>
</style>
