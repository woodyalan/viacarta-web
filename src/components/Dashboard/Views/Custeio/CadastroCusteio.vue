<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-select(
              v-if='funcionarios',
              label='Funcionário',
              placeholder='Funcionário', 
              v-model='custeio.funcionario', 
              name='funcionario', 
              :rules='{ required: true }',
              :options='funcionarios'
            )

          .col-md-6
            fg-input(
              type='text',
              label='Descrição',
              placeholder='Descrição', 
              v-model='custeio.descricao', 
              name='descricao', 
              :rules='{ required: true }'
            )

        .row
          .col-md-3
            fg-input-mask(
              label='Data do Envio',
              placeholder='Data do Envio', 
              v-model="custeio.data",
              name="data", 
              :rules="{ required: true, date_format: 'DD/MM/YYYY' }",
              :mask="['##/##/####']"
            )

          .col-md-3
            fg-input-money(
              label='Valor'
              v-model='custeio.valor', 
              name='valor',
              :money='money',
              :rules='{ required: true }'
            )

        .row
          .col-md-12
            fg-textarea(
              label='Observações',
              placeholder='Observações para este Custeio', 
              v-model='custeio.observacoes', 
              name='observacoes', 
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
import Cadastro from 'src/components/GeneralViews/Cadastro.vue'
import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
import CusteioService from 'src/domain/custeio/CusteioService'
import Custeio from 'src/domain/custeio/Custeio'
import moment from 'moment'
import swal from 'sweetalert2'

export default {
  $validates: true,
  components: {
    'cadastro': Cadastro
  },
  data () {
    return {
      route: 'custeio',
      loading: false,
      money: {
        decimal: ',', 
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      custeio: {
        funcionario: null,
        descricao: null,
        data: null,
        valor: null,
        observacoes: null
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

            let custeio = Object.assign({}, this.custeio);

            let data = custeio.data; 
            data = moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
            custeio.data = data;

            this.service = new CusteioService(this.$resource);

            if(this.$route.params.id) {
              this.service
                .update(this.$route.params.id, custeio)
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
                .save(custeio)
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
    this.custeio = new Custeio();

    if(this.$route.params.id) {
      this.service = new CusteioService(this.$resource);
      this.service
        .get(this.$route.params.id)
        .then(custeio => {
          let data = custeio.data;
          data = moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
          custeio.data = data;
          
          this.custeio = custeio;
          this.custeio.valor = parseFloat(custeio.valor);
        });
    }
  }
}
</script>

