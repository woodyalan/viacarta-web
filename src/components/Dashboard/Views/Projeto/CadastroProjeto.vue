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
              v-model='projeto.nome', 
              name='nome', 
              :rules='{ required: true }'
            )
          
          .col-md-6
            fg-select(
              v-if='clientes',
              label='Cliente',
              placeholder='Cliente', 
              v-model='projeto.cliente', 
              name='ativo', 
              :rules='{ required: true }',
              :options='clientes'
            )

        .row
          .col-md-6
            fg-select(
              v-if='centrosCusto',
              label='Centro de Custo',
              placeholder='Centro de Custo', 
              v-model='projeto.centroCusto', 
              name='centroCusto', 
              :rules='{ required: true }',
              :options='centrosCusto'
            )

          .col-md-3
            fg-datepicker(
              label='Início',
              placeholder='Selecione', 
              v-model="projeto.inicio",
              name="inicio",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules='{ required: true }'
            )

          .col-md-3
            fg-datepicker(
              label='Fim',
              placeholder='Selecione', 
              v-model="projeto.fim",
              name="fim",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules='{ required: false }'
            )
          
        .row
          .col-md-3
            fg-select(
              label='Ativo',
              placeholder='Ativo', 
              v-model='projeto.ativo', 
              name='ativo', 
              :rules='{ required: true }',
              :options='options.ativo'
            )   

        .row
          .col-xs-12
             fg-textarea(
              label='Escopo',
              placeholder='Descreva este projeto', 
              v-model='projeto.escopo', 
              name='escopo', 
              :rules='{ required: false }',
              :rows='8'
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
import Projeto from 'src/domain/projeto/Projeto'
import ClienteService from 'src/domain/cliente/ClienteService'
import CentroCustoService from 'src/domain/centroCusto/CentroCustoService'
import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
import ProjetoService from 'src/domain/projeto/ProjetoService'
import swal from 'sweetalert2'
import { Select, Option, DatePicker } from 'element-ui'

Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Select);

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'projeto',
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
      projeto: {
        nome: null,
        cliente: null,
        centroCusto: null,
        inicio: null,
        fim: null,
        conclusao: null,
        escopo: null,
        ativo: null
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
    },
    clientes() {
      this.service = new ClienteService(this.$resource);
      return this.service
        .get()
        .then(clientes => {
          return clientes.map(cliente => {
            return {
              value: cliente.id,
              text: cliente.pessoaObject.nome
            }
          });
        });
    },
    centrosCusto() {
      this.service = new CentroCustoService(this.$resource);
      return this.service
        .get()
        .then(centrosCusto => {
          return centrosCusto.map(centroCusto => {
            return {
              value: centroCusto.id,
              text: centroCusto.nome
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

            this.service = new ProjetoService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, this.projeto)
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
                .save(this.projeto)
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
    this.projeto = new Projeto();

    if(this.$route.params.id) {
      this.service = new ProjetoService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(projeto => this.projeto = projeto);
    }
  }
}
</script>

