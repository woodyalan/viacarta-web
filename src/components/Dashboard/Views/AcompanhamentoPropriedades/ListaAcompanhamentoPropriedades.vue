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
            @submit.prevent='buscarFichas()'
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
                th.text-info.col-md-1 #
                th.text-info Ficha
                th.text-info Intalação
                th.text-info Proprietário
                th

            tbody
              tr(
                v-for="registro in registros"
              )
                td {{ registro.id }}
                td {{ registro.numero }}
                td 
                  p.mb0 {{ registro.instalacao }}
                  a(
                    v-if="registro.latitude && registro.longitude"
                    target="_blank"
                    :href="`https://www.google.com/maps/?q=${registro.latitude},${registro.longitude}`"
                  ) 
                    small Ver localização
                td {{ registro.proprietario }}
                td.text-center
                  router-link(
                    :to="`/relatorios/propriedade/${registro.id}`"
                    target="_blank"
                  )
                    a.btn.btn-xs.btn-fill.btn-default Visualizar
                    a.btn.btn-xs.btn-fill.btn-danger(
                      @click.prevent="remover(registro.id)"
                    ) Remover

          p.lead.text-center(
            v-else
          ) Nenhum registro foi encontrado
</template>
<script>
import PropriedadeService from "src/domain/propriedade/PropriedadeService";
import LoginService from "src/domain/login/LoginService";
import swal from "sweetalert2";
import moment from "moment";

export default {
  $validates: true,
  data() {
    return {
      route: "acompanhamentoPropriedades",
      loading: false,
      registros: [],
      filtro: {
        inicio: new Date(),
        fim: new Date()
      }
    };
  },
  asyncComputed: {
    telaInfo() {
      let app = this;
      this.service = new LoginService(this.$http);
      return this.service.getTelaInfo(this.route).then(telaInfo => {
        let result = {
          title: telaInfo.descricao,
          menuPath: telaInfo.menuObject.path,
          tela: telaInfo.rota,
          rota: `/${telaInfo.menuObject.path}/${telaInfo.rota}`
        };

        app.$store.dispatch("setLastRoute", result);

        return result;
      });
    }
  },
  computed: {},
  methods: {
    validate() {
      return this.$validator
        .validateAll()
        .then(success => success)
        .catch(err => {
          console.log(err);
        });
    },
    validPeriod() {
      let inicio = moment(this.filtro.inicio, "DD/MM/YYYY");
      let fim = moment(this.filtro.fim, "DD/MM/YYYY");

      return fim.diff(inicio, "days") >= 0;
    },
    remover(id) {
      const app = this;
      swal({
          title: 'Atenção!',
          html: `Confirma a remoção do registro?`,
          type: 'question',
          buttonsStyling: false,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          allowOutsideClick: false
        }).then(function() {
          app.service = new PropriedadeService(app.$http);
          app.service
            .delete(id)
            .then(result => {
              if(result.success) {
                app.buscarFichas();
              }
            }).catch(e => {
              console.log(e);
                swal({
                  title: 'Ops!',
                  html: `Falha ao remover o registro.`,
                  buttonsStyling: false,
                  type: 'error',
                  confirmButtonClass: 'btn btn-success btn-fill',
                  allowOutsideClick: false
                });
            })  
        });
    },
    buscarFichas() {
      this.validate().then(success => {
        if (success && !this.loading) {
          if (this.validPeriod()) {
            this.loading = true;

            this._service = new PropriedadeService(this.$http);
            this._service.getAcompanhamentoPropriedades(this.filtro).then(
              registros => {
                this.registros = registros.result;

                this.loading = false;
              },
              err => {
                this.loading = false;

                swal({
                  title: "Ops!",
                  html: `Falha ao buscar as fichas. ${err}`,
                  buttonsStyling: false,
                  type: "error",
                  confirmButtonClass: "btn btn-danger btn-fill",
                  allowOutsideClick: false
                });
              }
            );
          } else {
            swal({
              title: "Ops!",
              html: `O período informado é inválido.`,
              buttonsStyling: false,
              type: "warning",
              confirmButtonClass: "btn btn-danger btn-fill",
              allowOutsideClick: false
            });
          }
        }
      });
    }
  },
  mounted() {
    let data = moment();
    let inicio = moment(moment(data).date(1), "YYYY-MM-DD");
    let fim = moment(data, "YYYY-MM-DD");

    this.filtro.inicio = inicio;
    this.filtro.fim = fim;
  }
};
</script>
