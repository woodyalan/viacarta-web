<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-select(
              label='Veículo',
              placeholder='Veículo', 
              v-model='seguroVeiculo.veiculo', 
              name='veiculo', 
              :rules='{ required: true }',
              :options='veiculos'
            )
          
          .col-md-3
            fg-select(
              label='Seguradora',
              placeholder='Seguradora', 
              v-model='seguroVeiculo.seguradora', 
              name='seguradora', 
              :rules='{ required: true }',
              :options='seguradoras'
            )

          .col-md-3
            fg-datepicker(
              label='Início',
              placeholder='Selecione', 
              v-model="seguroVeiculo.inicio",
              name="inicio",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules='{ required: true }'
            )

          .col-md-3
            fg-datepicker(
              label='Fim',
              placeholder='Selecione', 
              v-model="seguroVeiculo.fim",
              name="fim",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules='{ required: true }'
            )
  
    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Vue from 'vue'
import { DatePicker } from 'element-ui'

import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import VeiculoService from 'src/domain/veiculo/VeiculoService'
import SeguradoraService from 'src/domain/seguradora/SeguradoraService'
import SeguroVeiculoService from 'src/domain/seguroVeiculo/SeguroVeiculoService'
import SeguroVeiculo from 'src/domain/seguroVeiculo/SeguroVeiculo'
import swal from 'sweetalert2'

Vue.use(DatePicker);

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'seguroVeiculo',
      loading: false,
      seguroVeiculo: {
        veiculo: null,
        seguradora: null,
        inicio: new Date(),
        fim: new Date(),
        apolice: null
      }      
    }
  },
  asyncComputed: {
    veiculos() {
      this.service = new VeiculoService(this.$resource);
      return this.service
        .get()
        .then(veiculos => {
          return veiculos.map(item => {
            return {
              value: item.id,
              text: item.nome + ' | ' + item.placa
            }
          });
        });
    },
    seguradoras() {
      this.service = new SeguradoraService(this.$resource);
      return this.service
        .get()
        .then(seguradoras => {
          return seguradoras.map(item => {
            return {
              value: item.id,
              text: item.nome
            }
          });
        });
    }
  },
  methods: {
    validate() {
      return this.$validator
        .validateAll()
        .then(success => success)
        .catch((err) => {
          console.log(err)
        })
    },
    salvar() {
      let app = this;

      this.validate()
        .then(success => {
          if(success && !this.loading) {
            this.loading = true;

            this.service = new SeguroVeiculoService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.seguroVeiculo)
                .then(response => {
                  let success = response.success;

                  swal({
                    title: success ? 'Muito bem!' : 'Ops!',
                    html: success ? `O registro foi atualizado com sucesso` : `Falha ao salvar o registro. ${response.error}`,
                    buttonsStyling: false,
                    type: success ? 'success' : 'error',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    allowOutsideClick: false
                  }).then(function() {
                    if(success)
                      app.$store.dispatch('setBackToList', true);
                  });
                });
            } else {
              this.service
                .save(this.seguroVeiculo)
                .then(response => {
                  let success = response.success;

                  swal({
                    title: success ? 'Muito bem!' : 'Ops!',
                    html: success ? `O registro foi salvo com sucesso` : `Falha ao salvar o registro. ${response.error}`,
                    buttonsStyling: false,
                    type: success ? 'success' : 'error',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    allowOutsideClick: false
                  }).then(function() {
                    if(success)
                      app.$store.dispatch('setBackToList', true);
                  });
                });
            }
          }
        });
    }
  },
  mounted() {
    this.seguroVeiculo = new SeguroVeiculo();

    if(this.$route.params.id) {
      this.service = new SeguroVeiculoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(seguroVeiculo => this.seguroVeiculo = seguroVeiculo);
    }
  }
}
</script>

