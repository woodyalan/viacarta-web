<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>
    <input class="form-control border-input" v-bind="$props" :value="value"
           @input="$emit('input',$event.target.value)" v-validate="rules" :data-vv-as="label" 
           @blur="consultaCep($event.target.value)" v-mask="'#####-###'">
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
  import CepService from 'src/domain/cep/CepService';
  import Endereco from 'src/domain/cep/Endereco';

  export default {
    inject: ['$validator'],
    name: 'fg-input-cep',
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
    methods: {
      validateCep: function(value) {
        let cleanValue = value.replace(/[^\d]/g, '')
        return cleanValue.length == 8 
      },
      consultaCep: function(cep) {
        if(this.validateCep(cep)) {
          this.service = new CepService(this.$http)

          this.service
            .getEndereco(cep)
            .then(endereco => {
              this.$store.dispatch('setEndereco', endereco)
            })
        } else {
          this.$store.dispatch('setEndereco', new Endereco())
        }
      },
      updateValue: function (value) {
          this.$refs.input.value = value
          this.$emit('input', value)
      }
    }
  }

</script>
<style>

</style>
