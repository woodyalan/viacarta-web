<template lang="pug">
  cadastro(
    :route='route'
    :param-value='param'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-select(
              v-if='funcionarios',
              label='Funcionário',
              placeholder='Funcionário', 
              v-model='funcionarioProjeto.funcionario', 
              name='funcionario', 
              :disabled='edit'
              :rules='{ required: true }',
              :options='funcionarios'
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
import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
import FuncionarioProjetoService from 'src/domain/funcionarioProjeto/FuncionarioProjetoService'
import FuncionarioProjeto from 'src/domain/funcionarioProjeto/FuncionarioProjeto'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  computed: {
    edit() {
      return this.funcionarioProjeto.createdAt != null
    }
  },
  data () {
    return {
      route: 'funcionarioProjeto',
      param: this.$route.params.projetoId,
      loading: false,
      funcionarioProjeto: {
        projeto: null,
        funcionario: null
      }      
    }
  },
  asyncComputed: {
    funcionarios() {
      this.service = new FuncionarioService(this.$resource);
      return this.service
        .get()
        .then(funcionarios => {
          return funcionarios.map(funcionario => {
            return {
              value: funcionario.id,
              text: funcionario.pessoaFisicaObject.pessoaObject.nome
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

            this.service = new FuncionarioProjetoService(this.$http);
            
            if(this.funcionarioProjeto.createdAt) {
              this.service
                .update(this.funcionarioProjeto.projeto, this.funcionarioProjeto.funcionario, this.funcionarioProjeto)
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
                  loading = false;
                });
            } else {
              this.service
                .save(this.funcionarioProjeto)
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
                  loading = false;
                });
            }
          }
        });
    }
  },
  mounted() {
    this.funcionarioProjeto = new FuncionarioProjeto(this.$route.params.projetoId);

    if(this.$route.params.funcionarioId) {
      this.service = new FuncionarioProjetoService(this.$http);
      this.service
        .get(this.$route.params.projetoId, this.$route.params.funcionarioId)
        .then(funcionarioProjeto => this.funcionarioProjeto = funcionarioProjeto);
    }
  }
}
</script>

