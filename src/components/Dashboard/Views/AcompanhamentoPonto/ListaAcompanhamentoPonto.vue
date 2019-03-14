<template lang="pug">
  .row
    .col-xs-12
      .card(v-if='telaInfo')
        .card-header
          h4.title
            | {{ telaInfo.title }}

          p.category Filtro
        .card-content
          form(
            @submit.prevent='buscarLancamentos()'
          )
            .row
              .col-sm-6.col-md-3
                fg-datepicker(
                  label='Início',
                  placeholder='Selecione', 
                  v-model="filtro.inicio",
                  name="inicio",
                  format='dd/MM/yyyy',
                  value-format='yyyy-MM-dd',
                  :rules="{ required: true }",
                  :mask="['##/##/####']"
                )

              .col-sm-6.col-md-3
                fg-datepicker(
                  label='Fim',
                  placeholder='Selecione', 
                  v-model="filtro.fim",
                  name="fim",
                  format='dd/MM/yyyy',
                  value-format='yyyy-MM-dd',
                  :rules="{ required: true }",
                  :mask="['##/##/####']"
                )

              .col-md-6
                fg-select(
                  v-if='funcionarios',
                  label='Funcionário',
                  placeholder='Funcionário', 
                  v-model='filtro.funcionario', 
                  name='funcionario', 
                  :rules='{ required: true }',
                  :options='funcionarios'
                )
            hr

            .text-right
              button.btn.btn-info.btn-fill(
                :class='{ disabled: loading }'
                type="submit"
              ) Buscar

      .card.card-plain
        .card-content.table-responsive(
          v-if="registros"
        )
          table.table.table-hover(
            v-if="registros.length > 0"
          )
            thead
              tr
                th.text-info.text-center.col-md-2 Data
                th.text-info.text-center Registros

            tbody
              tr(
                v-for="registro in registros"
              )
                td.text-center 
                  | {{ moment(registro.data, 'YYYY-MM-DD').format('DD/MM/YYYY') }}
                  p.mb0.text-info 
                    small {{ registro.dataInfo.nomeDia }}
                td
                  a.btn.btn-info.btn-fill.btn-ponto(
                    v-for="registroPonto in registro.registrosPonto"
                  ) {{ registroPonto.horaRegistro }}

          p.lead.text-center(
            v-else
          ) Nenhum registro foi encontrado
</template>
<script>
  import RecursosHumanosService from 'src/domain/recursosHumanos/RecursosHumanosService'
  import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
  import LoginService from 'src/domain/login/LoginService'
  import swal from 'sweetalert2'
  import moment from 'moment'
  
  export default {
    $validates: true,
    data() {
      return {
        route: 'acompanhamentoPonto',
        loading: false,
        registros: [],
        filtro: {
          inicio: new Date(),
          fim: new Date(),
          funcionario: null
        }
      }
    },
    asyncComputed: {
      funcionarios() {
        this.service = new FuncionarioService(this.$resource);
          return this.service.get().then(funcionarios => {
            return funcionarios.map(funcionario => {
              return {
                value: funcionario.id,
                text: funcionario.pessoaFisicaObject.pessoaObject.nome
              };
            });
          });
      },
      telaInfo() {
        let app = this;
        this.service = new LoginService(this.$http);
        return this.service
          .getTelaInfo(this.route)
          .then(telaInfo => {
            let result = {
              title: telaInfo.descricao,
              menuPath: telaInfo.menuObject.path,
              tela: telaInfo.rota,
              rota: `/${telaInfo.menuObject.path}/${telaInfo.rota}`  
            }
            
            app.$store.dispatch('setLastRoute', result);

            return result;
          });
      }
    },
    computed: {
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
      formatMoney(value) {
        return parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
      },
      validPeriod() {
        let inicio = moment(this.filtro.inicio, 'DD/MM/YYYY');
        let fim = moment(this.filtro.fim, 'DD/MM/YYYY');

        return fim.diff(inicio, 'days') >= 0;
      },
      buscarLancamentos() {
        this.validate()
          .then(success => {
            if(success && !this.loading) {
              if(this.validPeriod()) {
                this.loading = true;

                // let filtro = Object.assign({}, this.filtro);

                // filtro.inicio = moment(filtro.inicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
                // filtro.fim = moment(filtro.fim, 'DD/MM/YYYY').format('YYYY-MM-DD');

                this._service = new RecursosHumanosService(this.$http);
                this._service
                  .getAcompanhamentoPonto(this.filtro)
                  .then(registros => {
                    this.registros = registros.result;

                    this.loading = false;
                  }, err => {
                    this.loading = false;
                    
                    swal({
                      title: 'Ops!',
                      html: `Falha ao buscar os registros. ${err}`,
                      buttonsStyling: false,
                      type: 'error',
                      confirmButtonClass: 'btn btn-danger btn-fill',
                      allowOutsideClick: false
                    });
                  });
              } else {
                swal({
                  title: 'Ops!',
                  html: `O período informado é inválido.`,
                  buttonsStyling: false,
                  type: 'warning',
                  confirmButtonClass: 'btn btn-danger btn-fill',
                  allowOutsideClick: false
                });
              }
            }
          });
      }
    },
    mounted() {
      let data = moment();
      let inicio = moment(moment(data).date(1), 'YYYY-MM-DD');
      let fim = moment(data, 'YYYY-MM-DD');

      this.filtro.inicio = inicio;
      this.filtro.fim = fim;
    }
  }
</script>
