<template lang="pug">
  cadastro(
    :route='route'
  )
    .row(slot='fields')
      .col-xs-12
        .row
          .col-md-6
            fg-input(
              label='Descrição',
              placeholder='Descrição', 
              v-model='despesa.descricao', 
              name='descricao', 
              :rules='{ required: true }'
            )

          .col-sm-6.col-md-3
            fg-input(
              label='Nota Fiscal',
              placeholder='Nota Fiscal', 
              v-model='despesa.notaFiscal', 
              name='notaFiscal', 
              :rules='{ required: true }'
            )

          .col-sm-6.col-md-3
            fg-input-money(
              label='Valor'
              v-model='despesa.valor', 
              name='valor',
              :money='money',
              :rules='{ required: true }'
            )

        .row
          .col-sm-6.col-md-3
            fg-select(
              v-if='tiposDespesa',
              label='Tipo da Despesa',
              placeholder='Tipo da Despesa', 
              v-model='despesa.tipoDespesa', 
              name='tipoDespesa', 
              :rules='{ required: true }',
              :options='tiposDespesa'
            )

          .col-sm-6.col-md-3
            fg-datepicker(
              label='Data da Despesa',
              placeholder='Selecione', 
              v-model="despesa.data",
              name="data",
              format='dd/MM/yyyy',
              value-format='yyyy-MM-dd',
              :rules='{ required: true }'
            )

          .col-md-6
            fg-select(
              v-if='projetos',
              label='Projeto',
              placeholder='Projeto', 
              v-model='despesa.projeto', 
              name='projeto', 
              :rules='{ required: true }',
              :options='projetos'
            )

        .row
          .col-md-6
            fg-select(
              v-if='funcionarios',
              label='Funcionário',
              placeholder='Funcionário', 
              v-model='despesa.funcionario', 
              name='funcionario', 
              :rules='{ required: true }',
              :options='funcionarios'
            )

          .col-md-6
            fg-select(
              v-if='fornecedores',
              label='Fornecedor',
              placeholder='Fornecedor', 
              v-model='despesa.fornecedor', 
              name='fornecedor', 
              :rules='{ required: true }',
              :options='fornecedores'
            )

        .row
          .col-md-12
            fg-textarea(
              label='Observações',
              placeholder='Observações para esta Despesa', 
              v-model='despesa.observacoes', 
              name='observacoes', 
              :rules='{ required: false }',
              :rows='8'
            )

        .row
          .col-md-12
            fg-dropzone(
              v-if="dropzoneVisible"
              name="myVueDropzone" 
              id="dropzone"
              label="Comprovantes da Despesa"
              :value="despesa.anexosDespesa"
              :url="uploadUrl"
              @fileRemoved="removerAnexo($event)"
            )
  
    button.btn.btn-fill.btn-info(
      :class='{ disabled: loading }'
      @click='salvar()',
      type='button',
      slot='actions'
    ) Salvar
</template>
<script>
import Cadastro from "src/components/GeneralViews/Cadastro.vue";
import FuncionarioService from "src/domain/funcionario/FuncionarioService";
import AnexoDespesaService from "src/domain/anexoDespesa/AnexoDespesaService";
import TipoDespesaService from "src/domain/tipoDespesa/TipoDespesaService";
import FornecedorService from "src/domain/fornecedor/FornecedorService";
import ProjetoService from "src/domain/projeto/ProjetoService";
import DespesaService from "src/domain/despesa/DespesaService";
import Despesa from "src/domain/despesa/Despesa";
import swal from "sweetalert2";

export default {
  $validates: true,
  components: {
    cadastro: Cadastro
  },
  data() {
    return {
      route: "despesa",
      loading: false,
      uploadUrl: process.env.API_URL + 'anexoDespesa/upload',
      filesLoaded: false,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      },
      despesa: {
        funcionario: null,
        fornecedor: null,
        projeto: null,
        data: null,
        valor: 0,
        notaFiscal: null,
        descricao: null,
        observacoes: null,
        tipoDespesa: null,
        anexosDespesa: []
      },
      dropzoneOptions: {
        dictDefaultMessage: "Arraste seus arquivos aqui",
        dictMaxFilesExceeded: "Você não pode adicionar mais arquivos",
        dictRemoveFile: "Remover",
        dictFileTooBig: "O arquivo é muito grande. Envie arquivos de até {{maxFilesize}}MB.",
        dictRemoveFileConfirmation: "Confirma a remoção do arquivo?",
        url: process.env.API_URL + "anexoDespesa/upload",
        addRemoveLinks: true,
        acceptedFiles: "image/*,application/pdf",
        thumbnailWidth: 150,
        maxFiles: 8,
        maxFilesize: 2,
        headers: {
          "x-access-token": this.$store.state.token
        }
      }
    };
  },
  computed: {
    dropzoneVisible() {
      if(this.$route.params.id) 
        return this.filesLoaded;
      else
        return true;
    },
    dropzoneFiles() {
      return this.despesa.anexosDespesa.length;
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
    fornecedores() {
      this.service = new FornecedorService(this.$resource);
      return this.service.get().then(forenecedores => {
        return forenecedores.map(fornecedor => {
          return {
            value: fornecedor.id,
            text: fornecedor.pessoaObject.nome
          };
        });
      });
    },
    tiposDespesa() {
      this.service = new TipoDespesaService(this.$resource);
      return this.service.get().then(tiposDespesa => {
        return tiposDespesa.map(tiposDespesa => {
          return {
            value: tiposDespesa.id,
            text: tiposDespesa.nome
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
    removerAnexo(id) {
      if(id != undefined) {
        this.service = new AnexoDespesaService(this.$http);
        this.service.delete(id);
      }
    },
    salvar() {
      let app = this;

      this.validate().then(success => {
        if (success && !this.loading) {
          this.loading = true;

          this.service = new DespesaService(this.$resource);

          if (this.$route.params.id) {
            this.service
              .update(this.$route.params.id, this.despesa)
              .then(response => {
                let success = response.success;

                swal({
                  title: success ? "Muito bem!" : "Ops!",
                  html: success
                    ? `O registro foi atualizado com sucesso`
                    : `Falha ao salvar o registro. ${response.error}`,
                  buttonsStyling: false,
                  type: success ? "success" : "error",
                  confirmButtonClass: "btn btn-success btn-fill",
                  allowOutsideClick: false
                }).then(function() {
                  if (success) app.$store.dispatch("setBackToList", true);
                });
              });
          } else {
            this.service
              .save(this.despesa)
              .then(response => {
                let success = response.success;

                swal({
                  title: success ? "Muito bem!" : "Ops!",
                  html: success
                    ? `O registro foi salvo com sucesso`
                    : `Falha ao salvar o registro. ${response.error}`,
                  buttonsStyling: false,
                  type: success ? "success" : "error",
                  confirmButtonClass: "btn btn-success btn-fill",
                  allowOutsideClick: false
                }).then(function() {
                  if (success) app.$store.dispatch("setBackToList", true);
                });
            }, err => {
              this.loading = false;
            });
          }
        }
      });
    }
  },
  mounted() {
    this.despesa = new Despesa();

    if (this.$route.params.id) {
      this.service = new DespesaService(this.$resource);
      this.service.get(this.$route.params.id).then(despesa => {
        this.despesa = despesa;
        this.despesa.valor = parseFloat(despesa.valor);

        this.despesa.anexosDespesa = this.despesa.anexosDespesa.map(a => {
          return {
              id: a.id,
              size: a.size,
              path: a.arquivo,
              name: a.arquivo
          }
        });

        if(this.despesa.anexosDespesa) {
          this.filesLoaded = true;
        }
      });
    }
  }
};
</script>

