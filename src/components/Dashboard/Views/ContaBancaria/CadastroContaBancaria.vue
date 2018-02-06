<template lang="pug">
  cadastro(
    :route='route'
    :param-value='param'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-3
            fg-select(
              v-if='bancos',
              label='Banco',
              placeholder='Banco', 
              v-model='contaBancaria.banco', 
              name='banco', 
              :rules='{ required: true }',
              :options='bancos'
            )
          
          .col-md-3
            fg-input(
              type='text',
              label='Agência',
              placeholder='Agência', 
              v-model='contaBancaria.agencia', 
              name='agencia', 
              :rules='{ required: true }'
            )

          .col-md-3
            fg-input(
              type='text',
              label='Conta',
              placeholder='Conta', 
              v-model='contaBancaria.conta', 
              name='conta', 
              :rules='{ required: true }'
            )
          
          .col-md-3
            fg-input(
              type='text',
              label='Operação',
              placeholder='Operação', 
              v-model='contaBancaria.operacao', 
              name='operacao', 
              :rules='{ required: false }'
            )

        .row
          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='contaBancaria.ativo', 
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
import Vue from 'vue'

import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import ContaBancariaService from 'src/domain/contaBancaria/ContaBancariaService'
import BancoService from 'src/domain/banco/BancoService'
import ContaBancaria from 'src/domain/contaBancaria/ContaBancaria'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'contaBancaria',
      param: this.$route.params.pessoaId,
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
      contaBancaria: {
        banco: null,
        agencia: null,
        conta: null,
        operacao: null,
        ativo: null
      }      
    }
  },
  asyncComputed: {
    bancos() {
      this.service = new BancoService(this.$resource);
      return this.service
        .get()
        .then(bancos => {
          return bancos.map(banco => {
            return {
              value: banco.id,
              text: banco.nome
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

            this.service = new ContaBancariaService(this.$http);
            
            this.contaBancaria.operacao = this.contaBancaria.operacao || null;

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.contaBancaria)
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
                .save(this.contaBancaria)
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
    this.contaBancaria = new ContaBancaria(this.$route.params.pessoaId);

    if(this.$route.params.id) {
      this.service = new ContaBancariaService(this.$http);
      this.service
        .get(this.$route.params.id)
        .then(contaBancaria => this.contaBancaria = contaBancaria);
    }
  }
}
</script>

