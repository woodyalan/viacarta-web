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
                fg-input-mask(
                  label='Início',
                  placeholder='Início', 
                  v-model="filtro.inicio",
                  name="inicio",
                  :rules="{ required: true, date_format: 'DD/MM/YYYY' }",
                  :mask="['##/##/####']"
                )

              .col-sm-6.col-md-3
                fg-input-mask(
                  label='Fim',
                  placeholder='Fim', 
                  v-model="filtro.fim",
                  name="fim",
                  :rules="{ required: true, date_format: 'DD/MM/YYYY' }",
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
                  //- el-dropdown(
                  //-   v-for="registroPonto in registro.registrosPonto"
                  //-   size='medium', 
                  //-   split-button='', 
                  //-   type='default'
                  //- )
                  //-   | {{ registroPonto.horaRegistro }}
                  //-   el-dropdown-menu(
                  //-     slot='dropdown'
                  //-   )
                  //-     el-dropdown-item Remover
                  a.btn.btn-info.btn-fill.btn-ponto(
                    v-for="registroPonto in registro.registrosPonto"
                  ) {{ registroPonto.horaRegistro }}


          //-   thead
          //-     tr
          //-       th.text-info #
          //-       th.text-info Data
          //-       th.text-info Descrição
          //-       th.text-info Funcionário
          //-       th.text-right.text-info Valor R$
          //-   tbody
          //-     tr.warning
          //-       td(
          //-         colspan='2'
          //-       )
          //-       td(
          //-         colspan='2'
          //-       ) Saldo Anterior
          //-       td.text-right  
          //-         strong {{ formatMoney(saldoAnterior) }}
          //-     tr(
          //-       v-for="lancamento in lancamentos"
          //-     )
          //-       td {{ lancamento.id }}
          //-       td {{ moment(lancamento.data, 'YYYY-MM-DD').format('DD/MM/YYYY') }}
          //-       td {{ lancamento.descricao }}
          //-         p.mb0.text-info(
          //-           v-if='lancamento.projeto'
          //-         )
          //-           small {{ lancamento.projeto }}
          //-       td {{ lancamento.funcionario }}
          //-         p.mb0.text-info(
          //-           v-if='lancamento.banco'
          //-         )
          //-           small {{ lancamento.banco }} {{ lancamento.agencia }} {{ lancamento.operacao }} {{ lancamento.conta }}
          //-       td.text-right {{ formatMoney(lancamento.valor) }} {{ lancamento.tipo }}
          //-     tr.info
          //-       td(
          //-         colspan='2'
          //-       )
          //-       td(
          //-         colspan='2'
          //-       ) Saldo Atual
          //-       td.text-right 
          //-         strong {{ formatMoney(saldoAtual) }}
          //-   tfoot
          //-     tr
          //-       th(
          //-         colspan='2'
          //-       ) {{ this.lancamentos.length }} Lançamento(s)
          //-       th.text-right(
          //-         colspan='2'
          //-       ) Total do(s) Lançamento(s) R$
          //-       th.text-right {{ formatMoney(totalLancamentos) }}

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
          inicio: null,
          fim: null,
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

        return fim.diff(inicio) > 0;
      },
      buscarLancamentos() {
        this.validate()
          .then(success => {
            if(success && !this.loading) {
              if(this.validPeriod()) {
                this.loading = true;

                let filtro = Object.assign({}, this.filtro);

                filtro.inicio = moment(filtro.inicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
                filtro.fim = moment(filtro.fim, 'DD/MM/YYYY').format('YYYY-MM-DD');

                this._service = new RecursosHumanosService(this.$http);
                this._service
                  .getAcompanhamentoPonto(filtro)
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
      let inicio = moment(moment(data).date(1), 'YYYY-MM-DD').format('DD/MM/YYYY');
      let fim = moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');

      // this.filtro.inicio = inicio;
      this.filtro.inicio = '01/09/2018';
      // this.filtro.fim = fim;
      this.filtro.fim = '30/09/2018';
      this.filtro.funcionario = 5;
    }
  }
</script>
