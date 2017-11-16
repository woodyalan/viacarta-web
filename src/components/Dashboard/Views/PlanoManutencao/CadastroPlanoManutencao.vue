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
              v-model='planoManutencao.nome', 
              name='nome', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='planoManutencao.ativo', 
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
import PlanoManutencaoService from 'src/domain/planoManutencao/PlanoManutencaoService'
import ServicoService from 'src/domain/servico/ServicoService'
import PlanoManutencao from 'src/domain/planoManutencao/PlanoManutencao'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'planoManutencao',
      param: this.$route.params.perfilId,
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
        ],
        tipoServico: [
          {
            value: 'T',
            text: 'Tempo'
          },
          {
            value: 'Q',
            text: 'Quilometragem'
          }
        ]
      },
      planoManutencao: {
        nome: null,
        ativo: null
      }
    }
  },
  asyncComputed: {
    servicos() {
      this.service = new ServicoService(this.$resource);
      return this.service
        .get()
        .then(servicos => {
          return servicos.map(item => {
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

            this.service = new PlanoManutencaoService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.planoManutencao)
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
                .save(this.planoManutencao)
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
    this.planoManutencao = new PlanoManutencao();

    if(this.$route.params.id) {
      this.service = new PlanoManutencaoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(planoManutencao => this.planoManutencao = planoManutencao);
    }
  }
}
</script>

