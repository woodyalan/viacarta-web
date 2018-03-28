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
              v-model='veiculo.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input(
              label='Ano',
              placeholder='Ano', 
              v-model='veiculo.ano', 
              name='ano',
              type='number', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input-mask(
              label='Placa',
              placeholder='Placa', 
              v-model='veiculo.placa', 
              name='placa', 
              :rules='{ required: true }'
              mask='AAA-####'
            )
        
        .row
          .col-md-3
            fg-input(
              label='Odômetro',
              placeholder='Odômetro', 
              v-model='veiculo.odometro', 
              name='odometro',
              type='number', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-select(
              v-if='tiposVeiculo',
              label='Tipo de Veículo',
              placeholder='Tipo de Veículo', 
              v-model='veiculo.tipoVeiculo', 
              name='tipoVeiculo', 
              :rules='{ required: true }',
              :options='tiposVeiculo'
            )

          .col-md-3
            fg-select(
              v-if='planosManutencao',
              label='Plano de Manutenção',
              placeholder='Plano de Manutenção', 
              v-model='veiculo.planoManutencao', 
              name='planoManutencao', 
              :rules='{ required: true }',
              :options='planosManutencao'
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='veiculo.ativo', 
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
import VeiculoService from 'src/domain/veiculo/VeiculoService'
import PlanoManutencaoService from 'src/domain/planoManutencao/PlanoManutencaoService'
import TipoVeiculoService from 'src/domain/tipoVeiculo/TipoVeiculoService'
import Veiculo from 'src/domain/veiculo/Veiculo'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'veiculo',
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
      veiculo: {
        nome: null,
        ano: null,
        odometro: null,
        placa: null,
        ativo: null,
		    planoManutencao: null,
		    tipoVeiculo: null
      }
    }
  },
  asyncComputed: {
    tiposVeiculo() {
      this.service = new TipoVeiculoService(this.$resource);
      return this.service
        .get()
        .then(tiposVeiculo => {
          return tiposVeiculo.map(tp => {
            return {
              value: tp.id,
              text: tp.nome
            }
          });
        });
    },
    planosManutencao() {
      this.service = new PlanoManutencaoService(this.$resource);
      return this.service
        .get()
        .then(planosManutencao => {
          return planosManutencao.map(item => {
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

            this.service = new VeiculoService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.veiculo)
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
                .save(this.veiculo)
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
            }
          }
        });
    }
  },
  mounted() {
    this.veiculo = new Veiculo();

    if(this.$route.params.id) {
      this.service = new VeiculoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(veiculo => this.veiculo = veiculo);
    }
  }
}
</script>

