<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-select(
              v-if='veiculos',
              label='Veículo',
              placeholder='Veículo', 
              v-model='ocorrencia.veiculo', 
              name='veiculo', 
              :rules='{ required: true }',
              :options='veiculos'
            )

          .col-md-3
            fg-select(
              v-if='tiposOcorrencia',
              label='Tipo da Ocorrência',
              placeholder='Tipo da Ocorrência', 
              v-model='ocorrencia.tipoOcorrencia', 
              name='tipoOcorrencia', 
              :rules='{ required: true }',
              :options='tiposOcorrencia'
            )

          .col-md-3
            fg-datepicker(
              label='Data da Ocorrência',
              placeholder='Selecione', 
              v-model="ocorrencia.data",
              name="data",
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
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import VeiculoService from 'src/domain/veiculo/VeiculoService'
import TipoOcorrenciaService from 'src/domain/tipoOcorrencia/TipoOcorrenciaService'
import OcorrenciaService from 'src/domain/ocorrencia/OcorrenciaService'
import Ocorrencia from 'src/domain/ocorrencia/Ocorrencia'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'ocorrencia',
      loading: false,
      ocorrencia: {
        veiculo: null,
        tipoOcorrencia: null,
        data: null
      }
    }
  },
  asyncComputed: {
    veiculos() {
      this.service = new VeiculoService(this.$resource);
      return this.service
        .get()
        .then(veiculos => {
          return veiculos.map(veiculo => {
            return {
              value: veiculo.id,
              text: veiculo.nome + " (" + veiculo.placa + ")"
            }
          });
        });
    },
    tiposOcorrencia() {
      this.service = new TipoOcorrenciaService(this.$resource);
      return this.service
        .get()
        .then(tiposOcorrencia => {
          return tiposOcorrencia.map(tipoOcorrencia => {
            return {
              value: tipoOcorrencia.id,
              text: tipoOcorrencia.nome
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

            this.service = new OcorrenciaService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.ocorrencia)
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
                .save(this.ocorrencia)
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
    let app = this;
    this.ocorrencia = new Ocorrencia();

    if(this.$route.params.id) {
      this.service = new OcorrenciaService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(ocorrencia => {
          this.ocorrencia = ocorrencia;
        });
    }
  }
}
</script>

