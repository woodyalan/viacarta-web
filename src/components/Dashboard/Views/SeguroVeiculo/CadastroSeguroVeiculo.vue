<template lang="pug">
  cadastro(
    :route='route',
    :param-value='param'
  )
    .row(slot='fields')
      .col-xs-12
        .row
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
            fg-input(
              label='Apólice',
              placeholder='Nº da Apólice', 
              v-model="seguroVeiculo.apolice",
              name="apolice",
              :rules="{ required: false }"
            )

          .col-md-3
            fg-datepicker(
              label='Início',
              placeholder='Selecione', 
              v-model="seguroVeiculo.inicio",
              name="data",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: true }",
              :mask="['##/##/####']"
            )

          .col-md-3
            fg-datepicker(
              label='Fim',
              placeholder='Selecione', 
              v-model="seguroVeiculo.fim",
              name="data",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules="{ required: true }",
              :mask="['##/##/####']"
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

import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import VeiculoService from 'src/domain/veiculo/VeiculoService'
import SeguradoraService from 'src/domain/seguradora/SeguradoraService'
import SeguroVeiculoService from 'src/domain/seguroVeiculo/SeguroVeiculoService'
import SeguroVeiculo from 'src/domain/seguroVeiculo/SeguroVeiculo'
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'seguroVeiculo',
      param: this.$route.params.veiculoId,
      loading: false,
      seguroVeiculo: {
        veiculo: this.$route.params.veiculoId,
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

            // let seguroVeiculo = Object.assign({}, this.seguroVeiculo);

            // let inicio = seguroVeiculo.inicio; 
            // let fim = seguroVeiculo.fim; 
            // inicio = moment(inicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
            // fim = moment(fim, 'DD/MM/YYYY').format('YYYY-MM-DD');
            // seguroVeiculo.inicio = inicio;
            // seguroVeiculo.fim = fim;
            this.seguroVeiculo.apolice = this.seguroVeiculo.apolice || null;

            this.service = new SeguroVeiculoService(this.$http);

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
                }, err => {
                  this.loading = false;
                  
                  swal({
                    title: 'Ops!',
                    html: `Falha ao salvar o registro. ${err}`,
                    buttonsStyling: false,
                    type: 'error',
                    confirmButtonClass: 'btn btn-danger btn-fill',
                    allowOutsideClick: false
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
                }), err => {
                  this.loading = false;
                  
                  swal({
                    title: 'Ops!',
                    html: `Falha ao salvar o registro. ${err}`,
                    buttonsStyling: false,
                    type: 'error',
                    confirmButtonClass: 'btn btn-danger btn-fill',
                    allowOutsideClick: false
                  });
                };
            }
          }
        });
    }
  },
  mounted() {
    this.seguroVeiculo = new SeguroVeiculo(this.$route.params.veiculoId);

    if(this.$route.params.id) {
      this.service = new SeguroVeiculoService(this.$http);
      this.service
        .get(this.$route.params.id)
        .then(seguroVeiculo => {
          let inicio = seguroVeiculo.inicio;
          let fim = seguroVeiculo.fim;
          inicio = moment(inicio, 'YYYY-MM-DD');
          fim = moment(fim, 'YYYY-MM-DD');
          seguroVeiculo.inicio = inicio;
          seguroVeiculo.fim = fim;

          this.seguroVeiculo = seguroVeiculo
        });
    }
  }
}
</script>

