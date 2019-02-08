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

              .col-md-3
                fg-select(
                  label='Tipo de Lançamento',
                  placeholder='Tipo de Lançamento', 
                  v-model='filtro.tipoLancamento', 
                  name='tipoLancamento', 
                  :rules='{ required: false }',
                  :options='options.tiposLancamento'
                )
            
            .row
              .col-md-6
                fg-select(
                  v-if='projetos',
                  label='Projeto',
                  placeholder='Projeto', 
                  v-model='filtro.projeto', 
                  name='projeto', 
                  :rules='{ required: false }',
                  :options='projetos'
                )

              .col-md-6
                fg-select(
                  v-if='funcionarios',
                  label='Funcionário',
                  placeholder='Funcionário', 
                  v-model='filtro.funcionario', 
                  name='funcionario', 
                  :rules='{ required: false }',
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
          v-if="lancamentos"
        )
          table.table.table-hover(
            v-if="lancamentos.length > 0"
          )
            thead
              tr
                th.text-info #
                th.text-info Data
                th.text-info Descrição
                th.text-info Funcionário
                th.text-right.text-info Valor R$
            tbody
              tr.warning
                td(
                  colspan='2'
                )
                td(
                  colspan='2'
                ) Saldo Anterior
                td.text-right  
                  strong {{ formatMoney(saldoAnterior) }}
              tr(
                v-for="lancamento in lancamentos"
              )
                td {{ lancamento.id }}
                td {{ moment(lancamento.data, 'YYYY-MM-DD').format('DD/MM/YYYY') }}
                td {{ lancamento.descricao }}
                  p.mb0.text-info(
                    v-if='lancamento.projeto'
                  )
                    small {{ lancamento.projeto }}
                td {{ lancamento.funcionario }}
                  p.mb0.text-info(
                    v-if='lancamento.banco'
                  )
                    small {{ lancamento.banco }} {{ lancamento.agencia }} {{ lancamento.operacao }} {{ lancamento.conta }}
                td.text-right {{ formatMoney(lancamento.valor) }} {{ lancamento.tipo }}
              tr.info
                td(
                  colspan='2'
                )
                td(
                  colspan='2'
                ) Saldo Atual
                td.text-right 
                  strong {{ formatMoney(saldoAtual) }}
            tfoot
              tr
                th(
                  colspan='2'
                ) {{ this.lancamentos.length }} Lançamento(s)
                th.text-right(
                  colspan='2'
                ) Total do(s) Lançamento(s) R$
                th.text-right {{ formatMoney(totalLancamentos) }}

          p.lead.text-center(
            v-else
          ) Nenhum lançamento foi encontrado
</template>
<script>
  import FinanceiroService from 'src/domain/financeiro/FinanceiroService'
  import ProjetoService from 'src/domain/projeto/ProjetoService'
  import FuncionarioService from 'src/domain/funcionario/FuncionarioService'
  import LoginService from 'src/domain/login/LoginService'
  import swal from 'sweetalert2'
  import moment from 'moment'
  
  export default {
    $validates: true,
    data() {
      return {
        route: 'acompanhamentoFinanceiro',
        loading: false,
        options: {
          tiposLancamento: [
            {
              value: 'D',
              text: 'Despesas'
            },
            {
              value: 'C',
              text: 'Custeios'
            }
          ]
        },
        lancamentos: [],
        saldoAnterior: null,
        filtro: {
          inicio: new Date(),
          fim: new Date(),
          tipoLancamento: null
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
      projetos() {
        this.service = new ProjetoService(this.$resource);
          return this.service.get().then(projetos => {
            return projetos.map(projeto => {
              return {
                value: projeto.id,
                text: projeto.nome
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
      totalLancamentos() {
        let total = 0;

        if(this.lancamentos != undefined){
          for (let i in this.lancamentos) {
            if (this.lancamentos.hasOwnProperty(i)) {
              let l = this.lancamentos[i];

              if(l.tipo == 'D') {
                total -= parseFloat(l.valor);
              } else {
                total += parseFloat(l.valor);
              }
            }
          }
        }

        return total.toFixed(2);
      },
      saldoAtual() {
        let saldoAtual = 0; 

        if(Math.sign(this.totalLancamentos) == -1) {
          saldoAtual = parseFloat(this.saldoAnterior) - (parseFloat(this.totalLancamentos) * -1);
        } else {
          saldoAtual = parseFloat(this.saldoAnterior) + parseFloat(this.totalLancamentos);
        }

        return saldoAtual.toFixed(2)
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

                this._service = new FinanceiroService(this.$http);
                this._service
                  .getAcompanhamentoFinanceiro(this.filtro)
                  .then(lancamentos => {
                    this.lancamentos = lancamentos.lancamentos;
                    this.saldoAnterior = lancamentos.saldoAnterior;

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
