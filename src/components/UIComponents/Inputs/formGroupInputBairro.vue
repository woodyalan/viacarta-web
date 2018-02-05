<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <input class="form-control border-input" v-bind="$props" :value="value"
           @input="updateValue($event.target.value)" v-validate="rules" :data-vv-as="label">
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  export default {
    inject: ['$validator'],
    name: 'fg-input-bairro',
    props: {
      type: {
        type: String,
        default: 'text'
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
    },
    data() {
      return {
        bairro: ''
      }
    }, 
    asyncComputed: {
      valueComputed() {
        let value

        if(this.$store.state.endereco.valid)
            value = this.$store.state.endereco.bairro
        else 
            value = this.value

        this.bairro = value
        
        return value
      }
    },
    watch: {
      bairro(value) {
        this.updateValue(value);
      }
    },
    methods: {
      updateValue: function (value) {
        this.$emit('input', value);
      }
    }
  }

</script>
<style>

</style>
