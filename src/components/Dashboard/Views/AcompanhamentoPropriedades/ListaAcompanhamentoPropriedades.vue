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

              .col-sm-12.col-md-6
                fg-select(
                  v-if="regioes"
                  label='Região',
                  placeholder='Região', 
                  v-model='filtro.regiaoId', 
                  name='regiaoId'
                  :rules='{ required: false }'
                  :options='regioes'
                )

            .row
              .col-sm-12.col-md-6
                fg-input(
                  label='Endereço',
                  placeholder='Endereço', 
                  v-model="filtro.endereco",
                  name="endereco",
                  :rules="{ required: false }"
                )

              .col-sm-6.col-md-3
                fg-input(
                  label='Número',
                  placeholder='Número', 
                  v-model="filtro.numero",
                  name="numero",
                  :rules="{ required: false }"
                )

              .col-sm-6.col-md-3
                fg-input(
                  label='Ficha',
                  placeholder='Ex: FC-000', 
                  v-model="filtro.ficha",
                  name="ficha",
                  :rules="{ required: false }"
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
          .row
            .col-xs-12.mb20(
              v-if="registros.length > 0"
            )
              el-dropdown.pull-right(@command='handleAction')
                el-button.btn.btn-primary.btn-fill(
                  :loading='loading'
                ) 
                  | Exportar 
                  span.caret
                el-dropdown-menu(slot="dropdown")
                  el-dropdown-item.text-info(command='exportarLote') 
                    i.ti-files 
                    |  Lote de Fichas
                  el-dropdown-item.text-info(command='exportarAnexos') 
                    i.ti-gallery
                    |  Anexos
                  //- el-dropdown-item.text-info(command='exportarArquivoUnico') 
                  //-   i.ti-file 
                  //-   |  Arquivo Único

          table.table.table-hover.table-report(
            v-if="registros.length > 0"
          )
            thead
              tr
                th.text-info.col-md-1 #
                th.text-info Ficha
                th.text-info Região
                th.text-info Instalação
                th.text-info Endereço
                th.text-info Número
                th

            tbody
              tr(
                v-for="registro in registros"
              )
                td {{ registro.id }}
                td {{ registro.ficha }}
                td {{ registro.regiao }}
                td {{ registro.instalacao }}
                td 
                  p.mb0 {{ registro.endereco }}
                  a(
                    v-if="registro.latitude && registro.longitude"
                    target="_blank"
                    :href="`https://www.google.com/maps/?q=${registro.latitude},${registro.longitude}`"
                  ) 
                    small Ver localização
                td {{ registro.numero }}
                td.text-center
                  router-link(
                    :to="`/relatorios/propriedade/${registro.id}`"
                    target="_blank"
                  )
                    a.btn.btn-xs.btn-fill.btn-default Visualizar

          p.lead.text-center(
            v-else
          ) Nenhum registro foi encontrado
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
import PropriedadeService from "src/domain/propriedade/PropriedadeService";
import RegiaoService from "src/domain/regiao/RegiaoService";
import LoginService from "src/domain/login/LoginService";

import Vue from "vue";
import swal from "sweetalert2";
import moment from "moment";

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
  $validates: true,
  data() {
    return {
      route: "acompanhamentoPropriedades",
      loading: false,
      registros: [],
      filtro: {
        inicio: new Date(),
        fim: new Date(),
        endereco: null,
        numero: null,
        ficha: null
      }
    };
  },
  computed: {
    apiUrl() {
      return process.env.API_URL;
    },
    fichasExportacao() {
      if (this.registros) {
        return this.registros.map(registro => {
          return registro.id;
        });
      }
    }
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
    },
    regioes() {
      this.service = new RegiaoService(this.$resource);
      return this.service.get().then(result => {
        return result.map(regiao => {
          return {
            text: regiao.nome,
            value: regiao.id
          };
        });
      });
    }
  },
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
    exportarLote() {
      if (this.fichasExportacao && !this.loading) {
        this.loading = true;

        this.service = new PropriedadeService(this.$http);
        this.service
          .exportarExcelLote(this.fichasExportacao)
          .then(result => {
            this.loading = false;

            window.open(`${this.apiUrl}${result.file}`, "_blank");
          })
          .catch(e => {
            this.loading = false;

            console.log(e);
            swal({
              title: "Ops!",
              html: `Falha ao exportar fichas.`,
              buttonsStyling: false,
              type: "error",
              confirmButtonClass: "btn btn-success btn-fill",
              allowOutsideClick: false
            });
          });
      }
    },
    exportarAnexos() {
      if (this.fichasExportacao && !this.loading) {
        this.loading = true;

        this.service = new PropriedadeService(this.$http);
        this.service
          .exportarAnexos(this.fichasExportacao)
          .then(result => {
            this.loading = false;

            window.open(`${this.apiUrl}${result.file}`, "_blank");
          })
          .catch(e => {
            this.loading = false;
            
            console.log(e);
            swal({
              title: "Ops!",
              html: `Falha ao exportar fichas.`,
              buttonsStyling: false,
              type: "error",
              confirmButtonClass: "btn btn-success btn-fill",
              allowOutsideClick: false
            });
          });
      }
    },
    remover(id) {
      const app = this;
      swal({
        title: "Atenção!",
        html: `Confirma a remoção do registro?`,
        type: "question",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        allowOutsideClick: false
      }).then(function() {
        app.service = new PropriedadeService(app.$http);
        app.service
          .delete(id)
          .then(result => {
            if (result.success) {
              app.buscarFichas();
            }
          })
          .catch(e => {
            console.log(e);
            swal({
              title: "Ops!",
              html: `Falha ao remover o registro.`,
              buttonsStyling: false,
              type: "error",
              confirmButtonClass: "btn btn-success btn-fill",
              allowOutsideClick: false
            });
          });
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
    },
    handleAction(action) {
      switch(action) {
        case 'exportarLote':
          this.exportarLote(); 
          break;

        case 'exportarAnexos':
          this.exportarAnexos(); 
          break;
      }
    }
  },
  mounted() {
    let data = moment();
    let inicio = moment(moment(data).month(0), "YYYY-MM-DD");
    let fim = moment(data, "YYYY-MM-DD");

    this.filtro.inicio = inicio;
    this.filtro.fim = fim;
  }
};
</script>

<style>
.table-report,
.table-report p {
  font-size: 12px;
}
</style>
