<template lang="pug">
  cadastro(
    :title='title',
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-select(
              v-if='servicos',
              label='Serviço',
              placeholder='Serviço', 
              v-model='servicoPlanoManutencao.servicoManutencao', 
              name='servicoManutencao', 
              :rules='{ required: true }',
              :options='servicos',
              :disabled='edit'
            )

          .col-md-3
            fg-input(
              label='Tempo de Realização',
              placeholder='Tempo em Meses', 
              v-model='servicoPlanoManutencao.tempo', 
              type='number',
              name='tempo', 
              :rules='{ min_value: 1, numeric: true, required: servicoPlanoManutencao.km == null }'
            )

          .col-md-3
            fg-input(
              label='Km de Realização',
              placeholder='Km', 
              v-model='servicoPlanoManutencao.km', 
              type='number',
              name='km', 
              :rules='{ min_value: 1, numeric: true, required: servicoPlanoManutencao.tempo == null }'
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
import ServicoPlanoManutencaoService from 'src/domain/servicoPlanoManutencao/ServicoPlanoManutencaoService'
import ServicoService from 'src/domain/servico/ServicoService'
import ServicoPlanoManutencao from 'src/domain/servicoPlanoManutencao/ServicoPlanoManutencao'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  computed: {
      edit() {
        return this.servicoPlanoManutencao.createdAt != null
      }
  },
  data () {
    return {
      title: 'Cadastro de Serviços do Plano de Manutenção',
      route: `/cadastros/servicoPlanoManutencao/${this.$route.params.planoManutencaoId}`,
      loading: false,
      servicoPlanoManutencao: {
        planoManutencao: null,
        servicoManutencao: null,
        tempo: null,
        km: null
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

            this.service = new ServicoPlanoManutencaoService(this.$http);

            if(this.servicoPlanoManutencao.createdAt) {
              this.service
                .update(this.servicoPlanoManutencao.planoManutencao, this.servicoPlanoManutencao.servicoManutencao, this.servicoPlanoManutencao)
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
                      app.$router.push(app.route);
                  });
                });
            } else {
              this.service
                .save(this.servicoPlanoManutencao)
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
                      app.$router.push(app.route);
                  });
                });
            }
          }
        });
    }
  },
  mounted() {
    this.servicoPlanoManutencao = new ServicoPlanoManutencao(this.$route.params.planoManutencaoId, null, null, null);

    if(this.$route.params.servicoId) {
      this.service = new ServicoPlanoManutencaoService(this.$http);
      this.service
        .get(this.$route.params.planoManutencaoId, this.$route.params.servicoId)
        .then(servicoPlanoManutencao => {
          this.servicoPlanoManutencao = servicoPlanoManutencao;
        });
    }
  }
}
</script>

