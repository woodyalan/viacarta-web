<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-input(
              type='text',
              label='Nome',
              placeholder='Nome', 
              v-model='tipoVeiculo.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='tipoVeiculo.ativo', 
              name='ativo', 
              :rules='{ required: true }',
              :options='options.ativo'
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
import TipoVeiculoService from 'src/domain/tipoVeiculo/TipoVeiculoService'
import TipoVeiculo from 'src/domain/tipoVeiculo/TipoVeiculo'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'tiposVeiculo',
      loading: false,
      options: {
        ativo: [
          {
            value: 1,
            text: 'Sim'
          },
          {
            value: 0,
            text: 'Não'
          }
        ]
      },
      tipoVeiculo: {
        nome: null,
        ativo: null
      }
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

            let tipoVeiculo = new TipoVeiculo(this.tipoVeiculo.nome, this.tipoVeiculo.ativo);

            this.service = new TipoVeiculoService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, tipoVeiculo)
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
                .save(tipoVeiculo)
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
    this.tipoVeiculo = new TipoVeiculo();

    if(this.$route.params.id) {
      this.service = new TipoVeiculoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(tipoVeiculo => this.tipoVeiculo = tipoVeiculo);
    }
  }
}
</script>

